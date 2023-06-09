import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Iconify from '../../components/iconify';
// sections
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import WhereToVoteRoundedIcon from '@mui/icons-material/WhereToVoteRounded';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppWidgetPrice from 'src/sections/@dashboard/app/AppWidgetPrice';
import { getAllBookings } from 'src/services/booking/bookingSlice';
import { getSportOfOwner } from 'src/services/sport/sportSlice';
import { getSportCentersOfOwner } from 'src/services/sportCenter/sportCenterSlice';
import {
  AppConversionRates,
  AppCurrentSubject,
  AppCurrentVisits,
  AppNewsUpdate,
  AppTrafficBySite,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { sportsOfOwner } = useSelector((state) => state.sport);
  const { sportCenterOfOwner } = useSelector((state) => state.sportCenter);
  const { bookings } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getSportOfOwner());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSportCentersOfOwner());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  var totalPriceBooking = bookings.reduce(function (total, booking) {
    return (total += booking.totalPrice);
  }, 0);

  console.log(totalPriceBooking);

  return (
    <>
      <Helmet>
        <title> Dashboard | TheThaoPlus </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Chào mừng bạn quay trở lại
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetPrice
              title="Doanh Thu"
              total={totalPriceBooking}
              color="success"
              icon={<AttachMoneyRoundedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Lượt Đặt Sân"
              total={bookings.length}
              icon={<BookOnlineRoundedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Môn Thể Thao"
              total={sportsOfOwner.length}
              color="info"
              icon={<SportsSoccerRoundedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Trung Tâm Thể Thao"
              total={sportCenterOfOwner.length}
              color="warning"
              icon={<WhereToVoteRoundedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Đánh giá các trung tâm thể thao"
              subheader="(+43%) so với tháng trước"
              // chartData={[
              //   { label: 'Italy', value: 400 },
              //   { label: 'Japan', value: 430 },
              //   { label: 'China', value: 448 },
              //   { label: 'Canada', value: 470 },
              //   { label: 'France', value: 540 },
              //   { label: 'Germany', value: 580 },
              //   { label: 'South Korea', value: 690 },
              //   { label: 'Netherlands', value: 1100 },
              //   { label: 'United States', value: 1200 },
              //   { label: 'United Kingdom', value: 1380 },
              // ]}
              chartData={sportCenterOfOwner.map((sportCenter) => {
                return { label: sportCenter.name, value: Math.random() * (1000 - 0) + 0 };
              })}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Môn thể thao được đặt nhiều"
              // chartData={[
              //   { label: 'America', value: 4344 },
              //   { label: 'Asia', value: 5435 },
              //   { label: 'Europe', value: 1443 },
              //   { label: 'Africa', value: 4443 },
              // ]}
              chartData={sportsOfOwner.map((sport) => {
                return { label: sport.name, value: Math.random() * (1000 - 500) + 500 };
              })}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
                theme.palette.main.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Tiếp cận trung tâm thể thao"
              subheader="(+43%) so với tháng trước"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
              ]}
              chartData={[
                // {
                //   name: 'Facebook',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                {
                  name: 'Facebook',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Instagram',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Dịch vụ ưa dùng"
              chartLabels={['Sân thể thao', 'Phòng thay đồ', 'Nước uống', 'Gửi xe', 'Phòng chờ']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Đặt sân mới"
              // list={[...Array(5)].map((booking, index) => ({
              //   id: faker.datatype.uuid(),
              //   title: faker.name.jobTitle(),
              //   description: faker.name.jobTitle(),
              //   image: `/assets/images/covers/cover_${index + 1}.jpg`,
              //   postedAt: faker.date.recent(),
              // }))}
              list={bookings.slice(-5).map((booking, index) => ({
                id: booking._id,
                title: booking.sportCenter.name,
                description: booking.sportField.name,
                image: booking.sportCenter.image,
                postedAt: moment(booking.createdAt),
              }))}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Lượng truy cập theo trang web"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
