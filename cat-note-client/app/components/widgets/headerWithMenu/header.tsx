'use client'

import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import PetsIcon from '@mui/icons-material/Pets';
import NavItem from "@/app/components/ui-components/menuItem/navItem";
import NavButton from "@/app/components/ui-components/navButton/navButton";
import ButtonVariant from "@/app/components/ui-components/button/buttonVariant";
import '../headerWithMenu/header.scss';
import { useUser } from '@auth0/nextjs-auth0/client';

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === "true")
  }, []);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className="header">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CatNote
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: 'block', md: 'none'},
                }}
              >
                {isAdmin && <NavItem route="users"/>}
                <NavItem route="tasks"/>
                <NavItem route="achievements"/>
              </Menu>
            </Box>
            <PetsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CatNote
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {isAdmin && <NavButton route="users"/>}
              <NavButton route="tasks"/>
              <NavButton route="achievements"/>
            </Box>

            {user && <ButtonVariant route="/api/auth/logout" variant="contained" text="Logout" />}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Header;
