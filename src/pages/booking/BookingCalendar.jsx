import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Avatar,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Label from 'src/components/label/Label';
import { useModal } from 'src/hooks/useModal';
import { getAllBookings, getBookingDetail } from 'src/services/booking/bookingSlice';
import formatCurrency from 'src/utils/formatPrice';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'MRI Registration',
    start: moment('2023-06-05T10:00:00').toDate(),
    end: moment('2023-06-05T11:00:00').toDate(),
  },
  {
    title: 'ENT Appointment',
    start: moment('2023-06-05T14:00:00').toDate(),
    end: moment('2023-06-05T15:30:00').toDate(),
  },
];

function BookingCalendarPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toogleOpen: toogleOpenDetail, isOpen: isOpenDetail } = useModal();

  const { booking, bookingCalendar } = useSelector((state) => state.booking);

  console.log(bookingCalendar);
  let listBooking = [];
  const [list, setList] = useState([]);

  useEffect(() => {
    for (let booking of bookingCalendar) {
      const newBookings = {
        ...booking,
        start: moment(booking.start).toDate(),
        end: moment(booking.end).toDate(),
        title: `${booking.sportCenter?.name}, ${booking.sportField?.name}`,
      };
      listBooking.push(newBookings);
    }
    setList(listBooking);
    console.log(listBooking);
  }, [dispatch, bookingCalendar, booking]);

  const handleGetDetail = (event) => {
    if (event._id) {
      dispatch(getBookingDetail(event._id));
      toogleOpenDetail();
    }
  };

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Thông tin đặt sân | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Thông tin đặt sân dạng lịch
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
              navigate('/dashboard/add-booking');
            }}
          >
            Thêm mới
          </Button>
        </Stack>

        <Card sx={{ p: 2 }}>
          <Calendar
            localizer={localizer}
            events={list}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={(myEventsList) => {
              const backgroundColor = '#00C187';
              const color = 'white';
              const border = 'solid 1px white';
              return { style: { backgroundColor, color, border } };
            }}
            onSelectEvent={handleGetDetail}
          />
        </Card>
      </Container>

      {isOpenDetail && (
        <Dialog
          sx={{
            '.css-154lg22-MuiPaper-root-MuiDialog-paper': {
              width: '60%',
              maxWidth: '60%',
              // height: '60%',
              // maxHeight: '60%',
            },
          }}
          open={isOpenDetail}
          onClose={toogleOpenDetail}
        >
          <DialogContent sx={{ width: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Thông tin đặt sân chi tiết
            </Typography>

            <Grid container spacing={2}>
              <Grid item sm={12} md={5}>
                <img
                  src={booking.sportCenter?.image}
                  alt={booking.sportCenter?.name}
                  style={{ borderRadius: '10px' }}
                />
              </Grid>
              <Grid item sm={12} md={7}>
                <Stack gap={1}>
                  <Typography variant="h3" color="main.main">
                    {booking.sportCenter?.name}
                  </Typography>

                  <Stack direction="row" alignItems="center">
                    <LocationOnIcon sx={{ color: 'main.main' }} />
                    <Typography>{booking.sportCenter?.address}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography sx={{ fontSize: '20px' }}>Sân:</Typography>
                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{booking.sportField?.name}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <img src="/assets/images/SportType.png" alt="sport-type" width={25} height={25} />
                    <Typography>{booking.sportField?.fieldType}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="h6">Ngày đặt:</Typography>
                    <Typography variant="h5" sx={{ color: 'main.main' }}>
                      {moment(booking.start).format('D-M-YYYY')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="h6">Thời gian bắt đầu:</Typography>
                    <Typography variant="h5" sx={{ color: 'main.main' }}>
                      {moment(booking.start).format('hh:mm a')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="h6">Thời gian kết thúc:</Typography>
                    <Typography variant="h5" sx={{ color: 'main.main' }}>
                      {moment(booking.end).format('hh:mm a')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={3}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="h6">Tổng tiền:</Typography>
                      <Typography variant="h5" sx={{ color: 'main.main' }}>
                        {formatCurrency(booking.sportField?.price)}
                      </Typography>
                    </Stack>

                    {/* <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="h6">Đặt cọc:</Typography>
                      <Typography variant="h5" sx={{ color: 'main.main' }}>
                        {formatCurrency(booking.sportField?.price * 0.25)}
                      </Typography>
                    </Stack> */}
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={3}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="h6">Trạng thái:</Typography>
                      <Label color={(booking.tracking === 'Pending' && 'warning') || 'success'}>
                        {booking.tracking}
                      </Label>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="h6">Thanh Toán:</Typography>
                      <Label color={(booking.payments === true && 'success') || 'error'}>
                        {booking.payments ? 'Paymented' : 'No payments'}
                      </Label>
                    </Stack>
                  </Stack>

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
            </Grid>
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

export default BookingCalendarPage;
