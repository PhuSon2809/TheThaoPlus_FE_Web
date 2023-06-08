import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewBooking } from 'src/services/booking/bookingSlice';
import { getSportOfOwner } from 'src/services/sport/sportSlice';
import { getSportCentersOfOwner } from 'src/services/sportCenter/sportCenterSlice';
import { getAllSportFields, getSportFieldDetail } from 'src/services/sportField/sportFieldSlice';
import formatCurrency from 'src/utils/formatPrice';
import * as Yup from 'yup';

function AddBookingForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sportsOfOwner } = useSelector((state) => state.sport);
  const { sportCenterOfOwner } = useSelector((state) => state.sportCenter);
  const { sportFields, sportField } = useSelector((state) => state.sportField);

  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [sportId, setSportId] = useState('');
  const [sportCenterId, setSportCenterId] = useState('');
  const [sportFieldId, setSportFieldId] = useState('');

  // Get list sport to select
  useEffect(() => {
    dispatch(getSportOfOwner());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSportCentersOfOwner());
  }, [dispatch]);

  useEffect(() => {
    sportCenterId && dispatch(getAllSportFields(sportCenterId));
  }, [dispatch, sportCenterId]);

  useEffect(() => {
    sportFieldId && dispatch(getSportFieldDetail(sportFieldId));
  }, [dispatch, sportFieldId]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  //Validate and handle submit
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
    },
    onSubmit: async (values, formikHelpers) => {
      const newBookingBody = {
        sportCenterId: sportCenterId,
        sportFieldId: sportFieldId,
        totalPrice: sportField?.price,
        deposit: sportField?.price * 0.25,
        start: startTime.$d,
        end: endTime.$d,
        userBooking: formik.values.name,
        phoneBooking: formik.values.phone,
      };
      console.log(newBookingBody);
      dispatch(createNewBooking({ newBookingBody, navigate }));
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên khách hàng'),
      phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không tồn tại'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {/* Input Field */}
        <Grid item xs={12} sm={9} md={8}>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" gap={3}>
              <FormControl fullWidth>
                <TextField
                  name="name"
                  label="Tên khách hàng"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                    {formik.errors.name}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  name="phone"
                  label="Số điện thoại khách hàng"
                  type="number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                {formik.errors.phone && (
                  <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                    {formik.errors.phone}
                  </Typography>
                )}
              </FormControl>
            </Stack>

            <Stack direction="row" alignItems="center" gap={3}>
              <FormControl fullWidth>
                <DateTimePicker label="Giờ bắt đầu" value={startTime} onChange={(newValue) => setStartTime(newValue)} />
              </FormControl>
              <FormControl fullWidth>
                <DateTimePicker label="Giờ kết thúc" value={endTime} onChange={(newValue) => setEndTime(newValue)} />
              </FormControl>
            </Stack>

            <FormControl>
              <InputLabel id="sport-label">Môn thể thao</InputLabel>
              <Select
                labelId="sport-label"
                id="demo-simple-select-helper"
                value={sportId}
                label="Sport"
                onChange={(e) => setSportId(e.target.value)}
                sx={{ textTransform: 'capitalize' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {sportsOfOwner.map((sport) => (
                  <MenuItem key={sport._id} value={sport._id} sx={{ textTransform: 'capitalize' }}>
                    {sport.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack direction="row" alignItems="center" gap={3}>
              <FormControl fullWidth>
                <InputLabel id="sport-center-label">Trung tâm thể thao</InputLabel>
                <Select
                  labelId="sport-center-label"
                  id="sport-center-select-helper"
                  value={sportCenterId}
                  label="Sport"
                  onChange={(e) => setSportCenterId(e.target.value)}
                  sx={{ textTransform: 'capitalize' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {sportCenterOfOwner.map((sportCenter) => (
                    <MenuItem key={sportCenter._id} value={sportCenter._id} sx={{ textTransform: 'capitalize' }}>
                      {sportCenter.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="sport-field-label">Sân</InputLabel>
                <Select
                  labelId="sport-field-label"
                  id="sport-field-select-helper"
                  value={sportFieldId}
                  label="Sport"
                  onChange={(e) => setSportFieldId(e.target.value)}
                  sx={{ textTransform: 'capitalize' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {sportFields.map((sportField) => (
                    <MenuItem key={sportField._id} value={sportField._id} sx={{ textTransform: 'capitalize' }}>
                      {sportField.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" alignItems="center" gap={3}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6">Price:</Typography>
                {sportField?.price ? (
                  <Typography variant="h5" sx={{ color: 'main.main' }}>
                    {formatCurrency(sportField?.price)}
                  </Typography>
                ) : (
                  <Typography variant="h5" sx={{ color: 'main.main' }}>
                    {formatCurrency(0)}
                  </Typography>
                )}
              </Stack>

              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6">Deposit:</Typography>
                {sportField?.price ? (
                  <Typography variant="h5" sx={{ color: 'main.main' }}>
                    {formatCurrency(sportField?.price * 0.25)}
                  </Typography>
                ) : (
                  <Typography variant="h5" sx={{ color: 'main.main' }}>
                    {formatCurrency(0)}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            gap={2}
            sx={{ mt: 10 }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#00C187',
                '&:hover': {
                  backgroundColor: '#30ca9c',
                },
              }}
            >
              Thêm mới
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate('/dashboard/booking');
              }}
            >
              Trở lại
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={3} md={4}>
          {!sportField?.images ? (
            <Card
              sx={{
                py: 10,
                mb: 2,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette['main'].darker,
                borderColor: (theme) => theme.palette['main'].lighter,
                borderWidth: 2,
                borderStyle: 'dashed',
              }}
            >
              <PhotoSizeSelectActualIcon fontSize="large" />
              <Typography variant="subtitle2">Hình ảnh cho sân thể thao</Typography>
            </Card>
          ) : (
            <Card
              sx={{
                p: 1,
                mb: 2,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette['main'].darker,
                borderColor: (theme) => theme.palette['main'].lighter,
                borderWidth: 2,
                borderStyle: 'dashed',
              }}
            >
              <img src={sportField?.images[0]} alt="sport center" style={{ borderRadius: '5px' }} />
            </Card>
          )}
        </Grid>
      </Grid>
    </form>
  );
}

export default AddBookingForm;
