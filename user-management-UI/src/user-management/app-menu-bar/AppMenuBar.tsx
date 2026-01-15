import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const pages = ['Add', 'List'];

export function AppMenuBar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path ? 'font-bold text-yellow-600' : 'text-white-600 hover:text-yellow-600';

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mx: 4,
              display: { xs: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            User Management
          </Typography>

          {pages.map((page) => (
            <Typography
              key={page}
              sx={{
                textAlign: 'center',
                mx: 4,
                display: { xs: 'flex' },
                textDecoration: 'none',
              }}
            >
              <Link href={`/${page}`} className={linkClass(`/${page}`)}>
                {page}
              </Link>
            </Typography>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
