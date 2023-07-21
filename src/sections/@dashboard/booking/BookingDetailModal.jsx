import { Avatar, Button, Dialog, DialogActions, DialogContent, Grid, Stack, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Label from 'src/components/label/Label';
import { getBookingDetail } from 'src/services/booking/bookingSlice';
import formatCurrency from 'src/utils/formatPrice';
import BookingDetailSkeleton from 'src/components/skeleton/BookingDetailSkeleton';

function BookingDetailModal({ isOpenDetail, toogleOpenDetail, idToDetail }) {
  const dispatch = useDispatch();

  const { booking, isLoading } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getBookingDetail(idToDetail));
  }, [dispatch, idToDetail]);

  return (
    <>
      {isOpenDetail && (
        <Dialog maxWidth="md" open={isOpenDetail} onClose={toogleOpenDetail}>
          <DialogContent sx={{ width: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Thông tin đặt sân chi tiết
            </Typography>
            {isLoading ? (
              <BookingDetailSkeleton />
            ) : (
              <Grid container spacing={2}>
                <Grid item sm={12} md={4}>
                  <img
                    src={booking.sportCenter?.image}
                    alt={booking.sportCenter?.name}
                    style={{ borderRadius: '10px' }}
                  />

                  <Stack direction="column" mt={2} gap={1}>
                    <Typography variant="subtitle1" color="main.main">
                      Thông tin khách hàng:
                    </Typography>

                    <Stack direction="row" alignItems="center" gap={1}>
                      <Avatar />

                      <Stack>
                        <Typography variant="subtitle1">{booking.userBooking}</Typography>
                        <Typography>0{booking.phoneBooking}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item sm={12} md={8}>
                  <Stack gap={1}>
                    <Typography variant="h4" color="main.main">
                      {booking.sportCenter?.name}
                    </Typography>

                    <Stack direction="row" alignItems="start">
                      <LocationOnIcon color="main" />
                      <Typography>{booking.sportCenter?.address}</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography>Sân:</Typography>
                      <Typography sx={{ fontWeight: 'bold' }}>{booking.sportField?.fieldType}</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography>Ngày đặt:</Typography>
                      <Typography variant="subtitle1">{moment(booking.date).format('D-M-YYYY')}</Typography>
                    </Stack>

                    <Stack direction="row" gap={5}>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Typography>Thời gian bắt đầu:</Typography>
                        <Typography variant="subtitle1">{booking.start}</Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" gap={1}>
                        <Typography>Thời gian kết thúc:</Typography>
                        <Typography variant="subtitle1">{booking.end}</Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={13}>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Typography>Trạng thái:</Typography>
                        <Label color={(booking.tracking === 'Pending' && 'warning') || 'success'}>
                          {booking.tracking}
                        </Label>
                      </Stack>

                      <Stack direction="row" alignItems="center" gap={1}>
                        <Typography>Thanh Toán:</Typography>
                        <Label color={(booking.payments === true && 'success') || 'error'}>
                          {booking.payments ? 'Paymented' : 'No payments'}
                        </Label>
                      </Stack>
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                      sx={{ backgroundColor: 'grey.200', p: 1, mt: 2 }}
                    >
                      <Typography variant="h5">Tổng tiền:</Typography>
                      <Typography variant="h5" sx={{ color: 'main.main' }}>
                        {formatCurrency(booking.totalPrice)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" size="small" onClick={toogleOpenDetail}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default BookingDetailModal;
