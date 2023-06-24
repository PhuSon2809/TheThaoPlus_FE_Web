import BlurOnIcon from '@mui/icons-material/BlurOn';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Box, Button, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { UtilitieNote, Utilities } from 'src/_mock/utilities';

function DetailSportCenter({ sportCenter }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <Grid container spacing={4}>
      <Grid item sm={12} md={12}>
        <Box sx={{ position: 'relative' }}>
          <img
            src="/assets/images/sport6.jpg"
            alt="cover"
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
          <Box
            sx={{
              width: '100%',
              height: '300px',
              background: '#000',
              opacity: 0.8,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          ></Box>
          <Stack
            gap={1}
            sx={{
              p: 2,
              position: 'absolute',
              top: 65,
              left: 0,
            }}
          >
            <Typography variant="h3" color="#fff">
              {sportCenter.name}
            </Typography>
            <Stack direction="row" gap={1}>
              <LocationOnIcon sx={{ color: 'main.main' }} />
              <Typography sx={{ color: '#fff' }}>{sportCenter.address}</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <StarRoundedIcon sx={{ color: 'main.main' }} />
              <Typography sx={{ color: '#fff' }}>Chưa có đánh giá nào</Typography>
            </Stack>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} sm={8} md={7}>
        <Typography variant="h3" color="main.main">
          {sportCenter.name}
        </Typography>

        <Divider sx={{ my: 3 }}></Divider>

        <Stack gap={1}>
          <Typography variant="subtitle1" gutterBottom sx={{ color: 'main.main' }}>
            Mô tả - Thông tin đính kèm
          </Typography>

          <Typography gutterBottom sx={{ textAlign: 'justify' }}>
            {sportCenter.description}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }}></Divider>

        <Stack gap={1}>
          <Typography variant="subtitle1" gutterBottom sx={{ color: 'main.main' }}>
            Tiện ích:
          </Typography>

          <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
            {Utilities.map((item) => (
              <Stack key={item.id} direction="row" alignItems="center" gap={1} width={250}>
                {item.icon}
                <Typography>{item.name}</Typography>
              </Stack>
            ))}
          </Stack>

          <Typography variant="subtitle1" gutterBottom sx={{ color: 'main.main', mt: 2 }}>
            Lưu ý:
          </Typography>

          <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
            {UtilitieNote.map((item) => (
              <Stack key={item.id} direction="row" alignItems="center" gap={1} width={200}>
                <ErrorRoundedIcon sx={{ color: 'main.main' }} />
                <Typography>{item.name}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }}></Divider>

        <Stack>
          <Typography variant="subtitle1" sx={{ color: 'main.main' }}>
            Môn Thể Thao:
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <img src={sportCenter.sport?.image} alt={sportCenter.sport?.name} width={60} height={60} />
            <Typography sx={{ textTransform: 'capitalize' }}>{sportCenter.sport?.name}</Typography>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={4} md={5}>
        <Stack gap={4}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            sx={{
              color: 'main.main',
              borderColor: 'main.light',
              '&:hover': {
                borderColor: 'main.main',
                backgroundColor: 'rgb(0, 193, 135, 0.08)',
              },
            }}
          >
            Bảng giá
          </Button>

          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'main.main', backgroundColor: 'grey.200', p: 1, mb: 2 }}>
              THÔNG TIN LIÊN LẠC:
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

            <Typography variant="subtitle2" sx={{ mt: 2, color: 'main.main' }}>
              11 người đã theo dõi địa điểm này
            </Typography>
          </Card>
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
              <img src={sportCenter.image} alt="sport center" style={{ borderRadius: '5px', width: '100%' }} />
            </Card>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default DetailSportCenter;
