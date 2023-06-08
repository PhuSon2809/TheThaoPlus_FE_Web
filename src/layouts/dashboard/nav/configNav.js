// MUI icons
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import WhereToVoteRoundedIcon from '@mui/icons-material/WhereToVoteRounded';
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const navConfigOwner = [
  {
    title: 'tổng quan',
    path: '/dashboard/app',
    icon: <LeaderboardRoundedIcon fontSize="small" />,
  },
  {
    title: 'môn thể thao',
    path: '/dashboard/sport',
    icon: <SportsSoccerRoundedIcon fontSize="small" />,
  },
  {
    title: 'trung tâm thể thao',
    path: '/dashboard/sport-center',
    icon: <WhereToVoteRoundedIcon fontSize="small" />,
  },
  {
    title: 'thông tin đặt sân',
    path: '/dashboard/booking',
    icon: <BookOnlineRoundedIcon fontSize="small" />,
  },
  {
    title: 'thông tin đặt sân theo lịch',
    path: '/dashboard/booking-calendar',
    icon: <CalendarMonthRoundedIcon fontSize="small" />,
  },
];

export default navConfigOwner;
