import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { LoadingButton } from '@mui/lab';
import { FormControl, IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginOwner } from 'src/services/auth/authSlice';
import * as Yup from 'yup';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, formikHelpers) => {
      const params = {
        navigate,
        user: formik.values,
      };
      dispatch(LoginOwner(params));
      formikHelpers.resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email format is not correct').required('Please Enter your Email'),
      password: Yup.string()
        .required('Please Enter your password')
        .min(6, 'Password should be 6 chars minimum.')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Password must contain at least one character and a number'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <FormControl>
          <TextField
            name="email"
            label="Địa chỉ Email"
            color="main"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <Typography sx={{ ml: '5px' }} variant="caption" color="red">
              {formik.errors.email}
            </Typography>
          )}
        </FormControl>

        <FormControl>
          <TextField
            name="password"
            label="Mật khẩu"
            color="main"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? (
                      <VisibilityRoundedIcon fontSize="small" />
                    ) : (
                      <VisibilityOffRoundedIcon fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formik.errors.password && (
            <Typography sx={{ ml: '5px' }} variant="caption" color="red">
              {formik.errors.password}
            </Typography>
          )}
        </FormControl>
      </Stack>

      <Stack sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover" sx={{ textAlign: 'right' }}>
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#00C187',
          '&:hover': {
            backgroundColor: '#30ca9c',
          },
        }}
      >
        Đăng nhập
      </LoadingButton>
    </form>
  );
}
