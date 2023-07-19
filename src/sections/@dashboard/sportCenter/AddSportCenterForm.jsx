import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { storage } from 'src/Firebase/firebase';
import { apiGetPublicDistrict, apiGetPublicProvinces } from 'src/services/provinces/provinces';
import { getSportOfOwner } from 'src/services/sport/sportSlice';
import { creatNewSportCenter } from 'src/services/sportCenter/sportCenterSlice';
import Fields from './Fields';
import SelectAddress from './SelectAddress';

const steps = ['Chọn hình ảnh', 'Thông tin chi tiết', 'Các loại sân'];

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên sân thể thao'),
    description: yup.string().required('Vui lòng nhập tên mô tả'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
  })
  .required();

function AddSportCenterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sportsOfOwner } = useSelector((state) => state.sport);
  const { isEditing } = useSelector((state) => state.sportCenter);

  const [openTime, setOpenTime] = useState(dayjs(new Date()));
  const [closeTime, setCloseTime] = useState(dayjs(new Date()));

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
  //--------------------------------------------

  // Handle select image
  const [inputImage, setInputImage] = useState([]);
  const [strgImg, setStrgImg] = useState([]);
  const [strgImgFB, setStrgImgFB] = useState([]);
  // console.log('inputImage', strgImgFB);
  // Display selected iamge
  const handleFileChange = (event) => {
    let image = [];
    let storageImage = [];
    for (let i = 0; i < event.target.files.length; i++) {
      if (
        event.target.files[i].type === 'image/png' ||
        event.target.files[i].type === 'image/jpeg' ||
        event.target.files[i].type === 'image/jpg' ||
        event.target.files[i].type === 'image/gif'
      ) {
        image.push(URL.createObjectURL(event.target.files[i]));
        storageImage.push(event.target.files[i]);
      }
    }
    setStrgImg(storageImage);
    setInputImage(image);
  };
  let imagesLink = [];
  const uploadAndGetLinkImg = async () => {
    console.log('objImage: ', strgImg);
    for (let i = 0; i < strgImg.length; i++) {
      const storageRef = ref(storage, `/SportFields/${strgImg[i].name}`);
      console.log(strgImg[i].name);
      await uploadBytes(storageRef, strgImg[i]);
      // get link from database to download
      await getDownloadURL(storageRef)
        .then((url) => {
          imagesLink.push(url);
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    }
    setStrgImgFB(imagesLink);
    console.log(imagesLink);
  };

  // handle deleted iamge
  const handleDeleteSelectedSource = () => {
    setInputImage([]);
  };
  //--------------------------------------------

  // Handle form
  const defaultValues = {
    name: '',
    description: '',
    sportId: '',
    address: '',
    priceOption: [
      {
        fieldType: '5x5',
        listPrice: [{ timeStart: 0, timeEnd: 3, price: Number(400000) }],
      },
    ],
  };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const name = watch('name');
  const description = watch('description');
  const sportId = watch('sportId');
  const address = watch('address');
  const priceOption = watch('priceOption');
  //--------------------------------------------

  // Submit create new sport center
  const handleCreateSportCenter = async (values) => {
    const newSportCenter = {
      name: name,
      description: description,
      image: strgImgFB,
      address: `${address}, ${districtName}, ${provinceName}`,
      latitude: coords?.lat,
      longtitude: coords?.lng,
      openTime: openTime.$d.toString(),
      closeTime: closeTime.$d.toString(),
      sportId: sportId,
      priceOption: priceOption,
    };
    console.log(newSportCenter);
    dispatch(creatNewSportCenter({ newSportCenter, navigate }));
  };
  //--------------------------------------------

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
  //--------------------------------------------

  const [activeStep, setActiveStep] = useState(0);

  // Handle next step
  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      if (
        name === '' ||
        description === '' ||
        sportId === '' ||
        address === '' ||
        provinceName === '' ||
        districtName === ''
      ) {
        toast.error('Vui lòng nhập đủ thông tin');
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle reset step ==> step = 1
  const handleReset = () => {
    setActiveStep(0);
  };
  //--------------------------------------------

  return (
    <form onSubmit={handleSubmit(handleCreateSportCenter)}>
      <Box sx={{ width: '100%' }}>
        <Box px={15} mb={8}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={index} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          </>
        ) : (
          <>
            {activeStep === 0 && (
              <Box mb={4}>
                {inputImage.length ? (
                  <Card
                    sx={{
                      p: 2,
                      mb: 2,
                      boxShadow: 0,
                      textAlign: 'center',
                      color: (theme) => theme.palette['main'].darker,
                      borderColor: (theme) => theme.palette['main'].lighter,
                      borderWidth: 2,
                      borderStyle: 'dashed',
                      position: 'relative',
                    }}
                  >
                    <ImageList variant="masonry" cols={3} gap={8}>
                      {inputImage.map((image, index) => (
                        <ImageListItem key={index}>
                          <img src={image} alt="sport" loading="lazy" />
                        </ImageListItem>
                      ))}
                    </ImageList>
                    <IconButton sx={{ mt: 2 }} onClick={handleDeleteSelectedSource}>
                      <CloseIcon />
                    </IconButton>
                  </Card>
                ) : (
                  <Card
                    sx={{
                      minHeight: 400,
                      p: 2,
                      mb: 2,
                      boxShadow: 0,
                      textAlign: 'center',
                      color: (theme) => theme.palette['main'].darker,
                      borderColor: (theme) => theme.palette['main'].lighter,
                      borderWidth: 2,
                      borderStyle: 'dashed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Stack alignItems="center" justifyContent="center">
                      <AddIcon fontSize="large" />
                      <Typography variant="subtitle2">Tải hình ảnh lên cho sân thể thao</Typography>
                    </Stack>
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
                    multiple
                    type="file"
                    onChange={handleFileChange}
                    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0 }}
                  />
                </Box>
              </Box>
            )}

            {activeStep === 1 && (
              <Card sx={{ p: 2.5 }}>
                <Grid container spacing={3}>
                  {/* Input Field */}
                  <Grid item xs={12} sm={9} md={6}>
                    <Stack spacing={3.3}>
                      <FormControl fullWidth>
                        <TextField
                          fullWidth
                          label="Tên trung tâm thể thao"
                          type="text"
                          color="main"
                          value={name}
                          {...register(`name`)}
                        />
                        {errors.name?.message && (
                          <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                            {errors.name?.message}
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
                        <InputLabel id="sport-label" color="main">
                          Môn thể thao
                        </InputLabel>
                        <Select
                          labelId="sport-label"
                          id="demo-simple-select-helper"
                          label="Môn thể thao"
                          color="main"
                          value={sportId}
                          {...register(`sportId`)}
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
                          label="Mô tả chi tiết"
                          type="text"
                          color="main"
                          multiline
                          minRows={8}
                          value={description}
                          {...register(`description`)}
                        />
                        {errors.description?.message && (
                          <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                            {errors.description?.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={3} md={6}>
                    <Stack spacing={3}>
                      <FormControl>
                        <TextField
                          label="Địa chỉ chi tiết"
                          type="text"
                          color="main"
                          value={address}
                          {...register(`address`)}
                        />
                        {errors.address?.message && (
                          <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                            {errors.address?.message}
                          </Typography>
                        )}
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
                          <AnyReactComponent
                            lat={coords?.lat}
                            lng={coords?.lng}
                            text={<LocationOnIcon color="error" />}
                          />
                        </GoogleMapReact>
                      </div>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            )}

            {activeStep === 2 && (
              <Stack spacing={3}>
                <Fields
                  {...{
                    control,
                    register,
                    defaultValues,
                    getValues,
                    setValue,
                    errors,
                    resetForm,
                  }}
                />
              </Stack>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
              <Button
                variant="contained"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Trở lại
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              {activeStep === steps.length - 1 ? (
                <>
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
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleNext();
                    uploadAndGetLinkImg();
                  }}
                >
                  Tiếp Theo
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </form>
  );
}

export default AddSportCenterForm;
