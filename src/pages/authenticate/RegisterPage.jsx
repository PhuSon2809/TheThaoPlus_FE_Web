import { Container, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import RegisterForm from 'src/sections/auth/register/RegisterForm';
import Logo from '../../components/logo';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 550,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Register | TheThaoPlus </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: { sm: 'relative', md: 'fixed' },
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 4, mt: 10, mb: 5 }}>
              Chào mừng bạn đến với ứng dụng của chúng tôi
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ px: 4 }}>
              <img src="/assets/illustrations/illustration_register.png" alt="register" style={{ width: '100%' }} />
            </Stack>
          </StyledSection>
        )}

        <Container maxWidth="md">
          <StyledContent>
            <Typography variant="h3" gutterBottom sx={{ mb: 1 }}>
              Đăng ký vào TheThaoPlus
            </Typography>
            <Typography variant="subtitle2" gutterBottom sx={{ mb: 0, opacity: 0.72 }}>
              Đăng ký làm Nhà cung cấp để quản lý các trung tâm thể thao của bạn
            </Typography>

            <Divider sx={{ my: 4 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                LET'S GO
              </Typography>
            </Divider>

            <RegisterForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default RegisterPage;
