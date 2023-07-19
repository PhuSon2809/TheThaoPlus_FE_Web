import LockIcon from '@mui/icons-material/Lock';
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from 'src/components/logo/Logo';
import { forgotPassword } from 'src/services/auth/authSlice';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

function ForgotPasswordPage() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, watch } = useForm();

  const email = watch('email');

  const onSubmit = (values) => {
    console.log(values);
    const data = { email };
    const params = { data, navigation };
    dispatch(forgotPassword(params));
  };

  return (
    <>
      <Helmet>
        <title> Đặt Lại Mật Khẩu | TheThaoPlus </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Card sx={{ p: 3, width: '500px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" alignItems="center" justifyContent="center" gap={5}>
              <Stack direction="column" alignItems="center" textAlign="center" gap={1} px={5}>
                <Box>
                  <IconButton color="main">
                    <LockIcon sx={{ fontSize: 150 }} />
                  </IconButton>
                </Box>
                <Typography variant="h3">Nhập Email</Typography>
                <Typography variant="subtitle2">
                  Nhập email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để thay đổi mật khẩu của bạn.
                </Typography>
              </Stack>

              <Stack width="100%" alignItems="center" gap={5}>
                <FormControl fullWidth>
                  <TextField color="main" label="Email" value={email} {...register('email')} />
                </FormControl>

                <Stack width="100%" px={3} direction="row" alignItems="center" gap={2}>
                  <Button fullWidth variant="contained" type="submit">
                    Đặt Lại Mật Khẩu
                  </Button>

                  <Divider orientation="vertical" flexItem />

                  <Button fullWidth variant="outlined" onClick={() => navigation('/register')}>
                    Đăng ký tài khoản mới
                  </Button>
                </Stack>

                <Typography variant="body2">
                  Trở lại {''}
                  <RouterLink to="/login" style={{ color: '#207cdc', fontWeight: 'bold' }}>
                    Đăng nhập
                  </RouterLink>
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Card>
      </StyledRoot>
    </>
  );
}

export default ForgotPasswordPage;
