import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RegisterOwner } from 'src/services/auth/authSlice';
import * as Yup from 'yup';

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('female');
  const [yob, setYob] = useState(dayjs(new Date()));

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
    },
    onSubmit: (values, formikHelpers) => {
      const newOwner = {
        firstname: formik.values.firstname,
        lastname: formik.values.lastname,
        email: formik.values.email,
        phone: `0${formik.values.phone}`,
        password: formik.values.password,
        gender: gender,
        YOB: moment(yob.$d).format('DD-MM-YYYY'),
        role: '646f1939cb8a74dfafdf1357',
      };
      const params = {
        newOwner,
        navigate,
      };
      console.log(params);
      dispatch(RegisterOwner(params));
      formikHelpers.resetForm();
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Vui lòng nhập họ của bạn'),
      lastname: Yup.string().required('Vui lòng nhập tên của bạn'),
      email: Yup.string().email('Định dạng email không chính xác').required('Vui lòng nhập địa chỉ email của bạn'),
      phone: Yup.string()
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập địa chỉ số điện thoại của bạn'),
      password: Yup.string()
        .required('Vui lòng nhập mật khẩu của bạn')
        .min(6, 'Mật khẩu phải có tối thiểu 6 ký tự')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Mật khẩu phải chứa ít nhất một ký tự và một số'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Stack direction="row" gap={3}>
          <FormControl fullWidth>
            <TextField
              name="firstname"
              label="Họ"
              color="main"
              value={formik.values.firstname}
              onChange={formik.handleChange}
            />
            {formik.errors.firstname && (
              <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                {formik.errors.firstname}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="lastname"
              label="Tên"
              color="main"
              value={formik.values.lastname}
              onChange={formik.handleChange}
            />
            {formik.errors.lastname && (
              <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                {formik.errors.lastname}
              </Typography>
            )}
          </FormControl>
        </Stack>

        <FormControl>
          <TextField
            type="number"
            name="phone"
            label="Số điện thoại"
            color="main"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && (
            <Typography sx={{ ml: '5px' }} variant="caption" color="red">
              {formik.errors.phone}
            </Typography>
          )}
        </FormControl>

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

        <FormControl>
          <FormLabel id="radio-buttons-group-label">Giới tính</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={gender}
            onChange={handleChangeGender}
          >
            <FormControlLabel value="female" control={<Radio color="main" />} label="Nữ" />
            <FormControlLabel value="male" control={<Radio color="main" />} label="Nam" />
            <FormControlLabel value="other" control={<Radio color="main" />} label="Khác" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth>
          <DatePicker
            sx={{
              '.css-1ifcsjq-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                color: 'main.main',
              },
              '.css-ysycdn-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'main.main',
              },
            }}
            label="Ngày sinh"
            value={yob}
            onChange={(newValue) => setYob(newValue)}
          />
        </FormControl>
      </Stack>

      <Stack direction="row" justifyContent="center" sx={{ my: 4 }}>
        <Typography variant="body2">
          Bạn đã có tài khoản? {''}
          <RouterLink to="/login" style={{ color: '#207cdc', fontWeight: 'bold' }}>
            Đăng nhập
          </RouterLink>
        </Typography>
      </Stack>

      <Button
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
        Đăng ký
      </Button>
    </form>
  );
}

export default RegisterForm;
