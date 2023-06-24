import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DetailSportCenter from 'src/sections/@dashboard/sportCenter/DetailSportCenter';
import ListSportField from 'src/sections/@dashboard/sportCenter/ListSportField';
import { getSportCenterDetail } from 'src/services/sportCenter/sportCenterSlice';
import { getAllSportFields, setAddSportField } from 'src/services/sportField/sportFieldSlice';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function SportCenterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sportCenter } = useSelector((state) => state.sportCenter);

  useEffect(() => {
    dispatch(getSportCenterDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllSportFields(id));
  }, [dispatch, id]);

  const [coords, setCoords] = useState(null);
  console.log(coords);

  useEffect(() => {
    const getCoords = async () => {
      const results = await geocodeByAddress(sportCenter?.address);
      const latLong = await getLatLng(results[0]);
      console.log(latLong);
      setCoords(latLong);
    };
    sportCenter && getCoords();
  }, [sportCenter, sportCenter?.address]);

  return (
    <>
      <Helmet>
        <title> Chi Tiết Trung Tâm Thể Thao | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chi Tiết Trung Tâm Thể Thao
          </Typography>
        </Stack>

        {/* Detail section */}
        <DetailSportCenter sportCenter={sportCenter} />

        {/* Map */}
        <Divider sx={{ mt: 3 }}></Divider>

        <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2 }}>
          <MapIcon sx={{ color: 'main.main' }} />
          <Typography variant="h6">Google Map</Typography>
        </Stack>

        <Typography variant="subtitle2" gutterBottom sx={{ opacity: 0.72 }}>
          Tìm đường đến trung tâm thể thao
        </Typography>

        <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
            defaultCenter={coords}
            defaultZoom={18}
            center={coords}
          >
            <AnyReactComponent lat={coords?.lat} lng={coords?.lng} text={<LocationOnIcon color="error" />} />
          </GoogleMapReact>
        </div>

        {/* List sport field section */}
        <Stack sx={{ mt: 15 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Danh sách các sân thể thao
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              sx={{
                backgroundColor: '#00C187',
                '&:hover': {
                  backgroundColor: '#30ca9c',
                },
              }}
              onClick={() => {
                dispatch(setAddSportField());
                navigate(`/dashboard/add-sport-field/${id}`);
              }}
            >
              Thêm mới
            </Button>
          </Stack>

          <ListSportField />
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mt: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/dashboard/sport');
            }}
          >
            Trở lại
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default SportCenterDetailPage;
