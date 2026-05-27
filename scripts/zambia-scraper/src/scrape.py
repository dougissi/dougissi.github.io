"""Scrape Zambia 2026 raised/goal totals from app.managedmissions.com.

Local usage (run from scripts/zambia-scraper/):
    cp .env.example .env  # fill in MM_USERNAME and MM_PASSWORD
    source .venv/bin/activate
    pip install -r src/requirements.txt
    python src/scrape.py

The same `scrape_zambia_totals(username, password)` function is imported by
handler.py for the Lambda runtime.
"""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://app.managedmissions.com"
LOGIN_URL = f"{BASE_URL}/Account/LogOn"
DASHBOARD_URL = f"{BASE_URL}/"
TRIP_NAME = "Zambia 2026"

MONEY_RE = re.compile(r"\$([\d,]+(?:\.\d{2})?)")


class ScrapeError(RuntimeError):
    pass


def _dump_debug(name: str, text: str) -> Path:
    path = Path(__file__).parent / f"debug_{name}.html"
    path.write_text(text)
    return path


def _money_to_float(s: str) -> float:
    return float(s.replace(",", ""))


def _login(session: requests.Session, username: str, password: str) -> None:
    # Prime the session with cookies from the login page
    session.get(LOGIN_URL, timeout=30).raise_for_status()

    payload = {
        "UserName": username,
        "Password": password,
        "RememberMe": "false",
    }
    r = session.post(LOGIN_URL, data=payload, timeout=30, allow_redirects=True)
    r.raise_for_status()

    # Heuristic: if we're still on the login page, login failed
    if "LogOn" in r.url:
        path = _dump_debug("post_login", r.text)
        raise ScrapeError(
            f"Login appears to have failed. Final URL: {r.url}. Dumped HTML to {path}"
        )


def _parse_trip_row(html: str, trip_name: str) -> tuple[float, float]:
    soup = BeautifulSoup(html, "html.parser")

    name_el = soup.find(string=re.compile(re.escape(trip_name)))
    if not name_el:
        path = _dump_debug("dashboard", html)
        raise ScrapeError(
            f"Trip '{trip_name}' not found on dashboard. Dumped HTML to {path}"
        )

    trip_container = name_el.find_parent("div", class_="trip")
    if trip_container is None:
        path = _dump_debug("dashboard", html)
        raise ScrapeError(
            f"No <div class='trip'> ancestor for '{trip_name}'. Dumped HTML to {path}"
        )

    raised_el = trip_container.select_one("span.raised.hidden-xs")
    goal_el = trip_container.select_one("span.goal span.hidden-xs")
    if raised_el is None or goal_el is None:
        path = _dump_debug("dashboard", html)
        raise ScrapeError(
            f"Could not find raised/goal spans in trip container. Dumped HTML to {path}"
        )

    raised_match = MONEY_RE.search(raised_el.get_text())
    goal_match = MONEY_RE.search(goal_el.get_text())
    if not raised_match or not goal_match:
        raise ScrapeError(
            f"raised='{raised_el.get_text()}' goal='{goal_el.get_text()}' did not match money regex"
        )

    return _money_to_float(raised_match.group(1)), _money_to_float(goal_match.group(1))


def scrape_zambia_totals(username: str, password: str) -> dict:
    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            )
        }
    )

    _login(session, username, password)

    r = session.get(DASHBOARD_URL, timeout=30)
    r.raise_for_status()
    raised, goal = _parse_trip_row(r.text, TRIP_NAME)

    return {
        "trip": TRIP_NAME,
        "raised_total": raised,
        "goal_total": goal,
        "percent": round(raised / goal * 100, 1) if goal else 0.0,
        "updated_at": datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z"),
    }


def main() -> int:
    try:
        from dotenv import load_dotenv

        load_dotenv(Path(__file__).parent.parent / ".env")
    except ImportError:
        pass

    username = os.environ.get("MM_USERNAME")
    password = os.environ.get("MM_PASSWORD")
    if not username or not password:
        print("Set MM_USERNAME and MM_PASSWORD (in .env or env vars)", file=sys.stderr)
        return 1

    try:
        result = scrape_zambia_totals(username, password)
    except ScrapeError as e:
        print(f"ScrapeError: {e}", file=sys.stderr)
        return 2

    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
