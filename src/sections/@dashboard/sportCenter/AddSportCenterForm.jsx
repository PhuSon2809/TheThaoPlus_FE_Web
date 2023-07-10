import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
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
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storage } from 'src/Firebase/firebase';
import { apiGetPublicDistrict, apiGetPublicProvinces } from 'src/services/provinces/provinces';
import { getSportOfOwner } from 'src/services/sport/sportSlice';
import * as Yup from 'yup';
import SelectAddress from './SelectAddress';
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { creatNewSportCenter } from 'src/services/sportCenter/sportCenterSlice';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function AddSportCenterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sportsOfOwner } = useSelector((state) => state.sport);
  const { isEditing, sportCenter } = useSelector((state) => state.sportCenter);

  const [openTime, setOpenTime] = useState(dayjs('2023-04-17T08:00'));
  const [closeTime, setCloseTime] = useState(dayjs('2023-04-17T22:30'));
  const [sportId, setSportId] = useState('');

  const [address, setAddress] = useState(isEditing ? sportCenter.address : '');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [districtName, setDistrictName] = useState();
  const [provinceName, setProvinceName] = useState();
  const [reset, setReset] = useState(false);

  // Get list sport to select
  useEffect(() => {
    dispatch(getSportOfOwner());
  }, [dispatch]);

  // Fetch list province in VN to select
  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response) {
        setProvinces(response?.results);
      }
    };
    fetchPublicProvince();
  }, []);

  // Fetch list district of province to select
  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response) {
        setDistricts(response?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    setProvinceName(province ? provinces?.find((item) => item.province_id === province)?.province_name : '');
    setDistrictName(district ? districts?.find((item) => item.district_id === district)?.district_name : '');
  }, [province, district, provinces, districts]);

  // Upload Image to firebase
  const [image, setImage] = useState();
  const [stringImg, setStringImg] = useState([]);
  const [stringImgFB, setStringImgFB] = useState();

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
      const storageRef = ref(storage, `/sportcenter/${stringImg[i].name}`);
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
    setStringImgFB(imagesLink[0]);
    console.log('imgLink: ', imagesLink[0]);
  };

  // Set up google map
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      setCoords({ lat: e.coords?.latitude, lng: e.coords?.longitude });
    });
  }, []);

  useEffect(() => {
    const addressFinal = `${address}, ${districtName}, ${provinceName}`;
    const getCoords = async () => {
      const results = await geocodeByAddress(addressFinal);
      const latLong = await getLatLng(results[0]);
      console.log(latLong);
      setCoords(latLong);
    };
    districtName && getCoords();
  }, [address, districtName, provinceName]);

  //Validate and handle submit
  const formik = useFormik({
    initialValues: {
      name: isEditing ? sportCenter.name : '',
      description: isEditing ? sportCenter.description : '',
    },
    onSubmit: async (values, formikHelpers) => {
      await uploadAndGetLinkImg();
      const newSportCenter = {
        name: formik.values.name,
        description: formik.values.description,
        image: stringImgFB ? stringImgFB : imagesLink[0],
        address: `${address}, ${districtName}, ${provinceName}`,
        latitude: coords?.lat,
        longtitude: coords?.lng,
        openTime: moment(openTime.$d).format('HH:mm'),
        closeTime: moment(closeTime.$d).format('HH:mm'),
        sportId: sportId,
      };
      console.log(newSportCenter);
      dispatch(creatNewSportCenter({ newSportCenter, navigate }));
      // formikHelpers.resetForm();
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter sport center name'),
      description: Yup.string().required('Please enter sport center description'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {/* Upload Image */}
        <Grid item xs={12} sm={3} md={4}>
          {!image ? (
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
              <AddIcon fontSize="large" />
              <Typography variant="subtitle2">Tải hình ảnh lên cho trung tâm thể thao</Typography>
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
              <img
                src={image ? image : stringImgFB}
                alt="sport center"
                style={{ borderRadius: '5px', width: '100%' }}
              />
            </Card>
          )}
          <Box sx={{ position: 'relative' }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#00C187',
              }}
            >
              Chọn ảnh
            </Button>
            <input
              type="file"
              onChange={onImageChange}
              style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0 }}
            />
          </Box>
        </Grid>

        {/* Input Field */}
        <Grid item xs={12} sm={9} md={8}>
          <Stack spacing={3}>
            <FormControl>
              <TextField
                name="name"
                label="Tên trung tâm thể thao"
                type="text"
                color="main"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && (
                <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                  {formik.errors.name}
                </Typography>
              )}
            </FormControl>

            <Stack direction="row" alignItems="center" gap={3}>
              <TimeField
                fullWidth
                label="Giờ mở cửa"
                color="main"
                value={openTime}
                onChange={(newValue) => setOpenTime(newValue)}
              />
              <TimeField
                fullWidth
                label="Giờ đóng cửa"
                color="main"
                value={closeTime}
                onChange={(newValue) => setCloseTime(newValue)}
              />
            </Stack>

            <FormControl>
              <TextField
                name="description"
                label="Mô tả chi tiết"
                type="text"
                color="main"
                multiline
                minRows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description && (
                <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                  {formik.errors.description}
                </Typography>
              )}
            </FormControl>

            <FormControl>
              <InputLabel id="sport-label" color="main">
                Môn thể thao
              </InputLabel>
              <Select
                labelId="sport-label"
                id="demo-simple-select-helper"
                value={sportId}
                label="Môn thể thao"
                color="main"
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

            <FormControl>
              <TextField
                name="address"
                label="Địa chỉ chi tiết"
                type="text"
                color="main"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </FormControl>

            <Stack direction="row" alignItems="center" gap={3}>
              <SelectAddress
                type="province"
                value={province}
                setValue={setProvince}
                options={provinces}
                label="Tỉnh/Thành phố"
              />

              <SelectAddress
                reset={reset}
                type="district"
                value={district}
                setValue={setDistrict}
                options={districts}
                label="Quận/Huyện"
              />
            </Stack>

            {/* Google Map */}
            <div style={{ height: '300px', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                defaultCenter={coords}
                defaultZoom={15}
                center={coords}
              >
                <AnyReactComponent lat={coords?.lat} lng={coords?.lng} text={<LocationOnIcon color="error" />} />
              </GoogleMapReact>
            </div>
          </Stack>

          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            gap={2}
            sx={{ mt: 10 }}
          >
            {isEditing ? (
              <Button type="submit" variant="contained" color="warning">
                Cập nhật
              </Button>
            ) : (
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
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate('/dashboard/sport-center');
              }}
            >
              Trở lại
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddSportCenterForm;
