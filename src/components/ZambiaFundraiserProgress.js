import { useEffect, useState } from 'react';
import { Box, LinearProgress, Typography, Skeleton } from '@mui/material';

const TOTALS_URL = 'https://dougissi-zambia-scraper-039612865604.s3.us-west-2.amazonaws.com/zambia-totals.json';
const REFRESH_MS = 15 * 60 * 1000;

const fmtMoney = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function formatUpdatedAgo(iso) {
  const updated = new Date(iso);
  const diffMs = Date.now() - updated.getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin === 1) return '1 minute ago';
  if (diffMin < 60) return `${diffMin} minutes ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr === 1) return '1 hour ago';
  if (diffHr < 24) return `${diffHr} hours ago`;
  const diffDay = Math.round(diffHr / 24);
  return diffDay === 1 ? '1 day ago' : `${diffDay} days ago`;
}

export default function ZambiaFundraiserProgress() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [, setTick] = useState(0);  // forces "X minutes ago" to re-render

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${TOTALS_URL}?t=${Date.now()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || String(e));
      }
    }

    load();
    const dataInterval = setInterval(load, REFRESH_MS);
    const tickInterval = setInterval(() => setTick((t) => t + 1), 60000);

    return () => {
      cancelled = true;
      clearInterval(dataInterval);
      clearInterval(tickInterval);
    };
  }, []);

  const box = (children) => (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '24px auto',
        padding: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      {children}
    </Box>
  );

  if (error && !data) {
    return box(
      <Typography variant="body2" color="text.secondary">
        Couldn't load fundraising totals right now.
      </Typography>
    );
  }

  if (!data) {
    return box(
      <>
        <Skeleton variant="text" width="60%" sx={{ marginBottom: 1 }} />
        <Skeleton variant="rectangular" height={12} sx={{ borderRadius: 1, marginBottom: 1 }} />
        <Skeleton variant="text" width="40%" />
      </>
    );
  }

  const { raised_total, goal_total, percent, updated_at } = data;
  const remaining = Math.max(goal_total - raised_total, 0);
  const clampedPct = Math.min(Math.max(percent, 0), 100);

  return box(
    <>
      <Typography variant="h6" component="div" gutterBottom>
        Fundraising progress
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 }}>
        <Typography variant="h5" component="div">
          {fmtMoney(raised_total)}
          <Typography component="span" variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
            of {fmtMoney(goal_total)}
          </Typography>
        </Typography>
        <Typography variant="h6" component="div" color="success.main">
          {percent.toFixed(0)}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={clampedPct}
        sx={{ height: 12, borderRadius: 1, marginBottom: 1.5 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          {remaining > 0 ? `${fmtMoney(remaining)} still needed` : 'Goal met — thank you!'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Updated {formatUpdatedAgo(updated_at)}
        </Typography>
      </Box>
    </>
  );
}
