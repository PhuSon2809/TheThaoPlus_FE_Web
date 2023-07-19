import dayjs from 'dayjs';
import * as Yup from 'yup';

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { storage } from 'src/Firebase/firebase';
import { updateAccount } from 'src/services/auth/authSlice';

function UpdateInformation({ isOpen, toogleOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isEditing, user } = useSelector((state) => state.auth);

  const [gender, setGender] = useState(isEditing ? user.gender : 'female');
  const [yob, setYob] = useState(isEditing ? dayjs(user.YOB) : dayjs(new Date()));

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const [image, setImage] = useState(isEditing && user.image);
  const [stringImg, setStringImg] = useState([]);

  const onImageChange = (event) => {
    let storageImage = [];
    console.log('event.target.files: ', event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      storageImage.push(event.target.files[0]);
    }
    setStringImg(storageImage);
  };

  let imagesLink = [];
  const uploadAndGetLinkImg = async () => {
    for (let i = 0; i < stringImg.length; i++) {
      const storageRef = ref(storage, `/avatar/${stringImg[i].name}`);
      console.log(stringImg[i].name);
      await uploadBytes(storageRef, stringImg[i]);
      // get link from database to download
      await getDownloadURL(storageRef)
        .then((url) => {
          imagesLink.push(url);
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    }
    console.log('imgLink: ', imagesLink[0]);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      firstname: isEditing ? user.firstname : '',
      lastname: isEditing ? user.lastname : '',
      email: isEditing ? user.email : '',
      phone: isEditing ? user.phone : '',
    },
    onSubmit: async (values, formikHelpers) => {
      await uploadAndGetLinkImg();
      const updateOwner = {
        firstname: formik.values.firstname,
        lastname: formik.values.lastname,
        email: formik.values.email,
        phone: `${formik.values.phone}`,
        gender: gender,
        YOB: yob,
        image: imagesLink[0] || user.iamge,
      };
      const params = {
        updateOwner,
        navigate,
      };
      dispatch(updateAccount(params));
      toogleOpen();
      formikHelpers.resetForm();
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Vui lòng nhập họ của bạn'),
      lastname: Yup.string().required('Vui lòng nhập tên của bạn'),
      email: Yup.string().email('Định dạng email không chính xác').required('Vui lòng nhập địa chỉ email của bạn'),
      phone: Yup.string()
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập địa chỉ số điện thoại của bạn'),
    }),
  });

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="md" fullWidth open={isOpen} onClose={toogleOpen}>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
                <Typography variant="h4">Cập nhật thông tin</Typography>
              </Stack>

              <Grid container columnSpacing={3}>
                <Grid item md={4}>
                  <Stack direction="column" alignItems="center">
                    <Avatar src={image} alt={user.lastname} sx={{ width: 240, height: 240 }} />
                    <Box position="relative" mt={2}>
                      <Button fullWidth variant="contained" color="main">
                        Chọn ảnh
                      </Button>
                      <input
                        type="file"
                        onChange={onImageChange}
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0 }}
                      />
                    </Box>
                  </Stack>
                </Grid>
                <Grid item md={8}>
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

                    <FormControl fullWidth>
                      <DatePicker
                        sx={{
                          '.css-1ifcsjq-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                            color: 'main.main',
                          },
                          '.css-ysycdn-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                            {
                              borderColor: 'main.main',
                            },
                        }}
                        label="Ngày sinh"
                        value={yob}
                        onChange={(newValue) => setYob(newValue)}
                      />
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
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="error" size="medium" onClick={toogleOpen}>
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

export default UpdateInformation;
