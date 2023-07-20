import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Box, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { UtilitieNote, Utilities } from 'src/_mock/utilities';
import formatCurrency from 'src/utils/formatPrice';

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
          <Card sx={{ p: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ color: 'main.main', backgroundColor: 'grey.200', p: 1, mb: 2 }}
            >
              <LocalOfferIcon fontSize="medium" color="main" />
              <Typography variant="h6">Giá tiền các loại sân</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />
            <Stack width="100%" direction="row" alignItems="center" gap={2}>
              <Stack width={70} alignItems="center">
                <Typography variant="subtitle1">Loại sân</Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack px={2} flex={1} alignItems="center">
                <Typography variant="subtitle1">Ngày áp dụng</Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack px={2} width={120} alignItems="center">
                <Typography variant="subtitle1">Giá tiền</Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack width="100%" direction="column" alignItems="center" gap={2}>
              {sportCenter.priceOption?.map((option, index) => (
                <Stack key={index} width="100%" direction="row" alignItems="center" gap={2}>
                  <Stack width={70} alignItems="center">
                    <Typography>{option.fieldType}</Typography>
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack px={2} flex={1} alignItems="center">
                    {option.listPrice?.map((price, i) => (
                      <Stack key={i}>
                        <Typography>
                          {price.timeStart === 0
                            ? 'Thứ hai'
                            : price.timeStart === 1
                            ? 'Thứ ba'
                            : price.timeStart === 2
                            ? 'Thứ tư'
                            : price.timeStart === 3
                            ? 'Thứ năm'
                            : price.timeStart === 4
                            ? 'Thứ sáu'
                            : price.timeStart === 5
                            ? 'Thứ bảy'
                            : 'Chủ nhật'}{' '}
                          -{' '}
                          {price.timeEnd === 0
                            ? 'Thứ hai'
                            : price.timeEnd === 1
                            ? 'Thứ ba'
                            : price.timeEnd === 2
                            ? 'Thứ tư'
                            : price.timeEnd === 3
                            ? 'Thứ năm'
                            : price.timeEnd === 4
                            ? 'Thứ sáu'
                            : price.timeEnd === 5
                            ? 'Thứ bảy'
                            : 'Chủ nhật'}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack px={2} width={120} alignItems="center">
                    {option.listPrice?.map((price, k) => (
                      <Stack key={k}>
                        <Typography>{formatCurrency(price.price)}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Card>
          {/* <Card sx={{ p: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ color: 'main.main', backgroundColor: 'grey.200', p: 1, mb: 2 }}
            >
              <LocalOfferIcon fontSize="medium" color="main" />
              <Typography variant="h6">Các slot hoạt động</Typography>
            </Stack>

            <Stack width="100%" direction="column" alignItems="center" gap={2}>
              {sportCenter.priceOption?.map((option, index) => (
                <Stack key={index} width="100%" direction="column" alignItems="start" gap={1}>
                  <Stack gap={1} direction="row" alignItems="center">
                    <Typography variant="subtitle1">Loại sân:</Typography>
                    <Typography>{option.fieldType}</Typography>
                  </Stack>

                  <Stack>
                    {option.slots?.map((slot, i) => (
                      <Stack key={i}>
                        <Label color={'success'} sx={{ textTransform: 'capitalize' }}>
                          {slot.timeStart} - {slot.timeEnd}
                        </Label>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Card> */}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default DetailSportCenter;
