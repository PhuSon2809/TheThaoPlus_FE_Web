import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from 'src/services/auth/authSlice';
import * as Yup from 'yup';

function UpdatePassword({ isOpenPassword, toogleOpenPassword }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassold, setShowPassold] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassconfirm, setShowPassconfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, formikHelpers) => {
      const params = {
        navigate,
        user: formik.values,
      };
      dispatch(updatePassword(params));
      toogleOpenPassword();
      formikHelpers.resetForm();
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required('Please Enter your password')
        .min(6, 'Password should be 6 chars minimum.')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Password must contain at least one character and a number'),
      password: Yup.string()
        .required('Please Enter your password')
        .min(6, 'Password should be 6 chars minimum.')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Password must contain at least one character and a number'),
      confirmPassword: Yup.string()
        .required('Please Enter your password')
        .min(6, 'Password should be 6 chars minimum.')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Password must contain at least one character and a number'),
    }),
  });

  return (
    <>
      {isOpenPassword && (
        <Dialog maxWidth="sm" fullWidth open={isOpenPassword} onClose={toogleOpenPassword}>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
                <Typography variant="h4">Thay đổi mật khẩu</Typography>
              </Stack>

              <Stack spacing={3}>
                <FormControl>
                  <TextField
                    name="oldPassword"
                    label="Mật khẩu cũ"
                    color="main"
                    type={showPassold ? 'text' : 'password'}
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassold(!showPassold)} edge="end">
                            {showPassold ? (
                              <VisibilityRoundedIcon fontSize="small" />
                            ) : (
                              <VisibilityOffRoundedIcon fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.errors.oldPassword && (
                    <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                      {formik.errors.oldPassword}
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <TextField
                    name="password"
                    label="Mật khẩu mới"
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
                <FormControl>
                  <TextField
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    color="main"
                    type={showPassconfirm ? 'text' : 'password'}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassconfirm(!showPassconfirm)} edge="end">
                            {showPassconfirm ? (
                              <VisibilityRoundedIcon fontSize="small" />
                            ) : (
                              <VisibilityOffRoundedIcon fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.errors.confirmPassword && (
                    <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                      {formik.errors.confirmPassword}
                    </Typography>
                  )}
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="error" size="medium" onClick={toogleOpenPassword}>
                Đóng
              </Button>
              <Button variant="contained" color="primary" size="medium" type="submit">
                Cập nhật
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
}

export default UpdatePassword;
