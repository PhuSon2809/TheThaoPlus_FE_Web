import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import { Button, Dialog, DialogActions, DialogContent, Grid, Popover, Stack, Typography } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Label from 'src/components/label/Label';
import MapCardSkeleton from 'src/components/skeleton/MapCardSkeleton';
import { getSportCenterDetail } from 'src/services/sportCenter/sportCenterSlice';

const LocationComponent = ({ text, onClick }) => <div onClick={onClick}>{text}</div>;

function SportCenterMapView({ isOpenMap, toogleOpenMap }) {
  const dispatch = useDispatch();

  const { sportCenterOfOwner, sportCenter, isLoading } = useSelector((state) => state.sportCenter);
  console.log(sportCenter);
  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      {isOpenMap && (
        <Dialog maxWidth="xl" fullWidth open={isOpenMap} onClose={toogleOpenMap}>
          <DialogContent sx={{ height: 700 }}>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
              <MapIcon fontSize="large" sx={{ color: 'main.main' }} />
              <Typography variant="h4">Xem vị trí trung tâm thể thao trên bản đồ</Typography>
            </Stack>

            <div style={{ height: '90%', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                defaultCenter={{ lat: 10.82302, lng: 106.62965 }}
                center={{ lat: 10.82302, lng: 106.62965 }}
                defaultZoom={12}
              >
                {sportCenterOfOwner?.map((item) => (
                  <LocationComponent
                    key={item._id}
                    lat={Number(item.latitude)}
                    lng={Number(item.longtitude)}
                    text={
                      <LocationOnIcon
                        sx={{ fontSize: 30 }}
                        color={
                          item.sport?.name === 'bóng đá'
                            ? 'error'
                            : item.sport?.name === 'bóng rổ'
                            ? 'warning'
                            : item.sport?.name === 'cầu lông'
                            ? 'primary'
                            : 'secondary'
                        }
                      />
                    }
                    onClick={(event) => {
                      setOpen(event.currentTarget);
                      dispatch(getSportCenterDetail(item._id));
                    }}
                  />
                ))}
              </GoogleMapReact>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" size="small" onClick={toogleOpenMap}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 300,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {isLoading ? (
          <MapCardSkeleton />
        ) : (
          <Grid container spacing={1}>
            <Grid item md={5}>
              <img src={sportCenter.image} alt={sportCenter.name} width="100%" />
            </Grid>
            <Grid item md={7}>
              <Typography variant="subtitle1" color="main.main">
                {sportCenter.name}
              </Typography>
              <Label
                color={
                  sportCenter.sport?.name === 'bóng đá'
                    ? 'success'
                    : sportCenter.sport?.name === 'bóng rổ'
                    ? 'warning'
                    : sportCenter.sport?.name === 'cầu lông'
                    ? 'primary'
                    : 'error'
                }
                sx={{ textTransform: 'capitalize' }}
              >
                {sportCenter.sport?.name}
              </Label>
            </Grid>
            <Stack direction="row" ml={1} mt={1}>
              <LocationOnIcon fontSize="small" sx={{ color: 'main.main' }} />
              <Typography variant="subtitle2" sx={{ textAlign: 'justify' }}>
                {sportCenter.address}
              </Typography>
            </Stack>
          </Grid>
        )}
      </Popover>
    </>
  );
}

export default SportCenterMapView;
