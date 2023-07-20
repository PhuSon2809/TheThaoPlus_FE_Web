import BlurOnIcon from '@mui/icons-material/BlurOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import { Box, Button, Card, Container, Divider, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SportCenterDetailSkeleton from 'src/components/skeleton/SportCenterDetailSkeleton';
import DetailSportCenter from 'src/sections/@dashboard/sportCenter/DetailSportCenter';
import { getSportCenterDetail } from 'src/services/sportCenter/sportCenterSlice';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function SportCenterDetailPage() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sportCenter, isLoading } = useSelector((state) => state.sportCenter);
  console.log('sportCenter', sportCenter);

  useEffect(() => {
    dispatch(getSportCenterDetail(id));
  }, [dispatch, id]);

  const [coords, setCoords] = useState(null);
  // console.log(coords);

  useEffect(() => {
    const getCoords = async () => {
      const results = await geocodeByAddress(sportCenter?.address);
      const latLong = await getLatLng(results[0]);
      console.log('latLong', latLong);
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

        {isLoading ? <SportCenterDetailSkeleton /> : <DetailSportCenter sportCenter={sportCenter} />}

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

        <Divider sx={{ my: 3 }}></Divider>

        <Box>
          {!sportCenter.image ? (
            <Card
              sx={{
                py: 14,
                mb: 2,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette['main'].darker,
                borderColor: (theme) => theme.palette['main'].lighter,
                borderWidth: 2,
                borderStyle: 'dashed',
              }}
            >
              <BlurOnIcon fontSize="large" />
              <Typography variant="subtitle2">Chưa có hình ảnh</Typography>
            </Card>
          ) : (
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
              }}
            >
              <ImageList sx={{ width: '100%' }} cols={3}>
                {sportCenter.image?.map((item) => (
                  <ImageListItem key={item}>
                    <img
                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Card>
          )}
        </Box>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mt: 10 }}>
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
      </Container>
    </>
  );
}

export default SportCenterDetailPage;
