import { Link as RouterLink} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Stack, Tooltip } from '@mui/material';
import { Link } from '@mui/material';


const siteTitle = 'DOUGISSI';

export default function NavBar() {

  const NavIconButton = ({ title, href, icon }) => {
    return (
      <Tooltip title={title}>
        <IconButton
          component={Link}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          sx={{ color: 'inherit' }}
        >
          {icon}
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {siteTitle}
          </Typography>

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={0}
            sx={{
              flexGrow: 1,
              display: 'flex'
            }}
          >
            <NavIconButton
              title="GitHub"
              href="https://github.com/dougissi"
              icon={<GitHubIcon/>}
            />
            <NavIconButton
              title="LinkedIn"
              href="https://www.linkedin.com/in/dougissi/"
              icon={<LinkedInIcon />}
            />
          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
