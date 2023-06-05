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
  const [yob, setYob] = useState(dayjs('2022-04-17'));

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
      // formikHelpers.resetForm();
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Please enter your firstname'),
      lastname: Yup.string().required('Please enter your lastname'),
      email: Yup.string().email('Email format is not correct').required('Please Enter your Email'),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      password: Yup.string()
        .required('Please Enter your password')
        .min(6, 'Password should be 6 chars minimum.')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Password must contain at least one character and a number'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Stack direction="row" gap={3}>
          <FormControl fullWidth>
            <TextField
              name="firstname"
              label="Firstname"
              color="success"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              sx={{
                '.css-1nnq42g-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                  color: 'main.main',
                },
                '.css-18w8rp2-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'main.main',
                },
              }}
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
              label="Lastname"
              color="success"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              sx={{
                '.css-1nnq42g-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                  color: 'main.main',
                },
                '.css-18w8rp2-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'main.main',
                },
              }}
            />
            {formik.errors.lastname && (
              <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                {formik.errors.lastname}
              </Typography>
            )}
          </FormControl>{' '}
        </Stack>

        <FormControl>
          <TextField
            type="number"
            name="phone"
            label="Phone"
            color="success"
            value={formik.values.phone}
            onChange={formik.handleChange}
            sx={{
              '.css-1nnq42g-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                color: 'main.main',
              },
              '.css-18w8rp2-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'main.main',
              },
            }}
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
            label="Email address"
            color="success"
            value={formik.values.email}
            onChange={formik.handleChange}
            sx={{
              '.css-1nnq42g-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                color: 'main.main',
              },
              '.css-18w8rp2-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'main.main',
              },
            }}
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
            label="Password"
            color="success"
            sx={{
              '.css-1nnq42g-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                color: 'main.main',
              },
              '.css-1v5aria-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'main.main',
              },
            }}
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
          <FormLabel id="radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={gender}
            onChange={handleChangeGender}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
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
            label="Birthday"
            value={yob}
            onChange={(newValue) => setYob(newValue)}
          />
        </FormControl>
      </Stack>

      <Stack direction="row" justifyContent="center" sx={{ my: 4 }}>
        <Typography variant="body2">
          Already have an account? {''}
          <RouterLink to="/login" style={{ color: '#207cdc', fontWeight: 'bold' }}>
            Sign in
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
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;
