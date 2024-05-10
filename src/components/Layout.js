import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLandingPage = location.pathname === '/';

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'QuickBill';
      case '/newInvoice':
        return 'QuickBill';
      case '/preview':
        return 'Invoice Preview';
      default:
        if (location.pathname.startsWith('/edit/')) {
          return 'Edit Invoice';
        }
        return 'QuickBill';
    }
  };

  const showBackButton = location.pathname !== '/' && !isLandingPage;
  const showAddButton = location.pathname === '/invoices';

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default
    }}>
      <AppBar 
        position="fixed" 
        elevation={0} 
        color="inherit"
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          {showBackButton && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={() => navigate(-1)}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Link to="/" className="no-underline">
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 600,
                letterSpacing: '-0.5px',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <HomeIcon sx={{ fontSize: 20 }} />
              {getTitle()}
            </Typography>
          </Link>
          {showAddButton && (
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <IconButton
                color="primary"
                aria-label="add invoice"
                onClick={() => navigate('/newInvoice')}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Spacer */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
          px: isMobile ? 2 : 3,
        }}
      >
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontSize: '0.875rem' }}
          >
            © 2024 Mohamed Soliman. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 