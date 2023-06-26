import { Avatar, Box, Drawer, Link, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Logo from '../../../components/logo';
import NavSection from '../../../components/nav-section';
import Scrollbar from '../../../components/scrollbar';
import useResponsive from '../../../hooks/useResponsive';
import navConfigOwner from './configNav';

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 2, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={user.image} alt={user.lastname} />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user.firstname} {user.lastname}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfigOwner} />

      <Stack alignItems="center" spacing={3} sx={{ px: 2.5, py: 2 }}>
        <Box component="img" src="/assets/illustrations/illustration_avatar.png" sx={{ width: 300 }} />
      </Stack>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

export default Nav;

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};
