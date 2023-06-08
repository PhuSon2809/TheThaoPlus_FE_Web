import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
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
  TextField,
  Typography,
} from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { storage } from 'src/Firebase/firebase';
import { getSportCenterDetail } from 'src/services/sportCenter/sportCenterSlice';
import { createNewSportField, updateSportField } from 'src/services/sportField/sportFieldSlice';
import * as Yup from 'yup';

function AddSportFieldForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { sportCenter } = useSelector((state) => state.sportCenter);
  const { isEditing, sportField } = useSelector((state) => state.sportField);

  useEffect(() => {
    dispatch(getSportCenterDetail(id));
  }, [dispatch, id]);

  const [fieldType, setFieldType] = useState(isEditing ? sportField.fieldType : '');
  const [inputImage, setInputImage] = useState(isEditing ? sportField.images : []);
  const [strgImg, setStrgImg] = useState([]);

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
  };

  // handle deleted iamge
  const handleDeleteSelectedSource = () => {
    setInputImage([]);
  };

  //Validate and handle submit
  const formik = useFormik({
    initialValues: {
      name: isEditing ? sportField.name : '',
      price: isEditing ? sportField.price : 0,
    },
    onSubmit: async (values, formikHelpers) => {
      await uploadAndGetLinkImg();
      const newSportField = {
        sportCenterId: id,
        name: formik.values.name,
        price: formik.values.price,
        images: imagesLink,
        fieldType: fieldType,
      };
      const updateSportFieldObj = {
        name: formik.values.name,
        price: formik.values.price,
        images: imagesLink,
        fieldType: fieldType,
      };
      console.log(newSportField);
      dispatch(
        isEditing
          ? updateSportField({ sportCenterId: id, sportFieldId: sportField._id, updateSportFieldObj, navigate })
          : createNewSportField({ sportCenterId: id, newSportField, navigate })
      );
      // formikHelpers.resetForm();
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter sport field name'),
      price: Yup.number().required('Please enter sport center price'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {/* Upload Image */}
        <Grid item xs={12} sm={7} md={8}>
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
                    <img src={image} alt={'image'} loading="lazy" />
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
                minHeight: 300,
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
        </Grid>

        {/* Input Field */}
        <Grid item xs={12} sm={5} md={4}>
          <Card sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'main.main', backgroundColor: 'grey.200', p: 1, mb: 2 }}>
              {sportCenter.name}
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" gap="5px">
                <LocationOnIcon sx={{ color: 'main.main' }} />
                <Typography>{sportCenter.address}</Typography>
              </Stack>
              <Stack direction="row" gap={1}>
                <LocalPhoneRoundedIcon sx={{ color: 'main.main' }} />
                <Typography>{user.phone}</Typography>
              </Stack>
            </Stack>
          </Card>

          <Stack spacing={3}>
            <FormControl>
              <TextField
                name="name"
                label="Tên sân"
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
              <InputLabel id="sport-label">Loại sân</InputLabel>
              <Select
                labelId="sport-label"
                id="demo-simple-select-helper"
                value={fieldType}
                label="Sport"
                onChange={(e) => setFieldType(e.target.value)}
              >
                <MenuItem value="5 x 5">5 x 5</MenuItem>
                <MenuItem value="7 x 7">7 x 7</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <TextField
                name="price"
                label="Giá tiền"
                type="text"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.errors.price && (
                <Typography sx={{ ml: '5px' }} variant="caption" color="red">
                  {formik.errors.price}
                </Typography>
              )}
            </FormControl>
          </Stack>
        </Grid>

        <Grid item md={12} sm={12}>
          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            gap={2}
            sx={{ mt: 5 }}
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
                navigate(`/dashboard/sport-center-detail/${id}`);
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

export default AddSportFieldForm;
