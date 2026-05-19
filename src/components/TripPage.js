import { useEffect, useState } from 'react';
import { Box, Button, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import Markdown from './Markdown';

export default function TripPage({ title, mdFileName, qrBasePath, shareText }) {
  const [snack, setSnack] = useState({ open: false, message: '' });

  useEffect(() => {
    const prev = document.title;
    document.title = `${title} | DougIssi`;
    return () => { document.title = prev; };
  }, [title]);

  const handleShare = async () => {
    const url = window.location.href;
    const payload = { title, url, ...(shareText ? { text: shareText } : {}) };

    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return; // user dismissed share sheet
        // otherwise fall through to clipboard
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        setSnack({ open: true, message: 'Link copied to clipboard' });
        return;
      } catch {
        // fall through
      }
    }

    setSnack({ open: true, message: `Copy this link: ${url}` });
  };

  return (
    <div style={{ paddingTop: '10px' }}>
      <Typography
        variant="h4"
        component="div"
        style={{
          margin: 'auto',
          maxWidth: '1000px',
          paddingRight: '5%',
          paddingLeft: '5%',
        }}
      >
        {title}
      </Typography>
      <Markdown fileName={mdFileName} />
      {qrBasePath && (
        <Box
          sx={{
            maxWidth: '1000px',
            margin: 'auto',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '24px',
            paddingBottom: '32px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Share this page
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShareIcon />}
            onClick={handleShare}
            sx={{ marginBottom: 3 }}
          >
            Share
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            Or scan / print this QR code:
          </Typography>
          <Box
            component="img"
            src={`${qrBasePath}.png`}
            alt="QR code linking to this page"
            sx={{
              width: 240,
              height: 240,
              maxWidth: '90%',
              display: 'block',
              margin: '0 auto 16px',
            }}
          />
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            href={`${qrBasePath}.png`}
            download
          >
            Download QR code
          </Button>
        </Box>
      )}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        message={snack.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}
