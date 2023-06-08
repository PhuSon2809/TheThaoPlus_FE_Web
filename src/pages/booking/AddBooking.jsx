import { Container, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import AddBookingForm from 'src/sections/@dashboard/booking/AddBookingForm';

function AddBooking() {
  return (
    <>
      <Helmet>
        <title> Tại mới Booking | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="column" alignItems="start" gap={1} mb={5}>
          <Typography variant="h4">Add New Booking</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Thêm thông tin đặt sân mới cho khách hàng đặt sân qua điện thoại.
          </Typography>
        </Stack>
        <AddBookingForm />
      </Container>
    </>
  );
}

export default AddBooking;
