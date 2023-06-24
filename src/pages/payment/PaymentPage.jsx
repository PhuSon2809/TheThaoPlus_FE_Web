import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
// import PaypalPayment from 'src/sections/@dashboard/payment/PaypalPayment';
import { getAllBookings } from 'src/services/booking/bookingSlice';
import formatCurrency from 'src/utils/formatPrice';

function PaymentPage() {
  // const initialOptions = {
  //   'client-id': 'ATGO9pzWMtZFVsk-xvLsxeId6dI8NTtVV-DPaw0x6zMfRuNdYuLDjuJS319cg-mXt3dAuDLmRrd_tgL4',
  //   currency: 'USD',
  //   intent: 'capture',
  //   // 'data-client-token': 'abc123xyz==',
  // };

  const dispatch = useDispatch();

  const { bookings } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  var totalPriceBooking = bookings.reduce(function (total, booking) {
    return (total += booking.totalPrice);
  }, 0);

  // Hàm tính toán chuyển đổi VND sang USD
  // function convertVNDtoUSD(amountInVND, exchangeRate = 23000) {
  //   // Kiểm tra nếu tỷ giá hợp lệ
  //   if (exchangeRate > 0) {
  //     // Tính toán số tiền chuyển đổi
  //     var amountInUSD = amountInVND / exchangeRate;
  //     return amountInUSD;
  //   } else {
  //     console.log('Tỷ giá không hợp lệ.');
  //     return null;
  //   }
  // }

  return (
    <>
      <Helmet>
        <title> Thanh Toán | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack mb={5}>
          <Typography variant="h4">Thanh Toán</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Thanh toán chi phí đăng thông tin trung tâm thể thao cho thuê hàng tháng của bạn cho TheThaoPlus
          </Typography>
        </Stack>

        <Grid container spacing={10}>
          <Grid item sm={12} md={5}>
            <img src="/assets/images/momo.jpg" width="100%" alt="momo" />
          </Grid>
          <Grid item sm={12} md={7}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: 'main.main', backgroundColor: 'grey.200', p: 1, mb: 2 }}
              >
                THÔNG TIN THANH TOÁN:
              </Typography>

              <Stack gap={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <EventNoteIcon sx={{ color: 'main.main' }} />
                    <Typography>Thời gian:</Typography>
                  </Stack>
                  <Typography variant="subtitle1">Tháng 6</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <BookOnlineRoundedIcon sx={{ color: 'main.main' }} />
                    <Typography>Số lượng booking:</Typography>
                  </Stack>
                  <Typography variant="subtitle1">{bookings.length}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <AttachMoneyRoundedIcon sx={{ color: 'main.main' }} />
                    <Typography>Tổng doanh thu:</Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ color: 'main.main' }}>
                    {formatCurrency(totalPriceBooking)}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <PaymentRoundedIcon sx={{ color: 'main.main' }} />
                    <Typography>Số tiền phải thanh toán:</Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ color: 'main.main' }}>
                    {formatCurrency(totalPriceBooking * 0.03)}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  {/* <Stack direction="row" alignItems="center" gap={1}>
                    <PaymentRoundedIcon sx={{ color: 'main.main' }} />
                    <Typography>Số tiền phải thanh toán theo USD:</Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ color: 'main.main' }}>
                    {Math.ceil(convertVNDtoUSD(totalPriceBooking * 0.03))} USD
                  </Typography> */}
                  {/* <Typography variant="h5" sx={{ color: 'main.main' }}>
                    {convertVNDtoUSD(totalPriceBooking * 0.03)} USD
                  </Typography> */}
                </Stack>
              </Stack>
            </Card>

            {/* <PaypalPayment cost={Math.ceil(convertVNDtoUSD(totalPriceBooking * 0.1))} /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PaymentPage;
