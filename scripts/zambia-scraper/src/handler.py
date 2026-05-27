"""Lambda entrypoint: scrape totals and write JSON to S3."""

from __future__ import annotations

import json
import os

import boto3

from scrape import ScrapeError, scrape_zambia_totals

SSM_USERNAME_PARAM = os.environ["SSM_USERNAME_PARAM"]
SSM_PASSWORD_PARAM = os.environ["SSM_PASSWORD_PARAM"]
S3_BUCKET = os.environ["S3_BUCKET"]
S3_KEY = os.environ.get("S3_KEY", "zambia-totals.json")

ssm = boto3.client("ssm")
s3 = boto3.client("s3")


def _get_secret(name: str) -> str:
    return ssm.get_parameter(Name=name, WithDecryption=True)["Parameter"]["Value"]


def lambda_handler(event, context):
    username = _get_secret(SSM_USERNAME_PARAM)
    password = _get_secret(SSM_PASSWORD_PARAM)

    try:
        result = scrape_zambia_totals(username, password)
    except ScrapeError as e:
        # Re-raise so Lambda marks the invocation as failed and EventBridge can retry
        raise RuntimeError(f"Scrape failed: {e}") from e

    body = json.dumps(result, separators=(",", ":")).encode("utf-8")
    s3.put_object(
        Bucket=S3_BUCKET,
        Key=S3_KEY,
        Body=body,
        ContentType="application/json",
        CacheControl="public, max-age=60",
    )

    return {"ok": True, **result}
