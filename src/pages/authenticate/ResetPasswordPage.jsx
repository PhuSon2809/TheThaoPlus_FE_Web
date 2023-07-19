import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, Card, FormControl, IconButton, Stack, TextField, Typography, styled } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from 'src/components/logo/Logo';
import { resetPassword } from 'src/services/auth/authSlice';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

function ResetPasswordPage() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const { register, handleSubmit, watch } = useForm();

  const password = watch('password');

  const onSubmit = (values) => {
    console.log(values);
    const data = { password };
    const params = { token, data, navigation };
    console.log(params);
    dispatch(resetPassword(params));
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
                <Typography variant="h3">Đặt Lại Mật Khẩu</Typography>
                <Typography variant="subtitle2"> Nhập mật khẩu mới của bạn</Typography>
              </Stack>

              <Stack width="100%" alignItems="center" gap={5}>
                <FormControl fullWidth>
                  <TextField color="main" label="New password" value={password} {...register('password')} />
                </FormControl>

                <Button fullWidth variant="contained" type="submit">
                  Đặt Lại Mật Khẩu
                </Button>
              </Stack>
            </Stack>
          </form>
        </Card>
      </StyledRoot>
    </>
  );
}

export default ResetPasswordPage;
