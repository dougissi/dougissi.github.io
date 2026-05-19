import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import Markdown from './Markdown';

export default function TripPage({ title, mdFileName, qrBasePath }) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} | DougIssi`;
    return () => { document.title = prev; };
  }, [title]);

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
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            Scan the QR code below — or download it to share.
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
    </div>
  );
}
