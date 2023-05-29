// MUI icons
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import WhereToVoteRoundedIcon from '@mui/icons-material/WhereToVoteRounded';
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const navConfigOwner = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <LeaderboardRoundedIcon fontSize="small" />,
  },
  {
    title: 'sport',
    path: '/dashboard/sport',
    icon: <SportsSoccerRoundedIcon fontSize="small" />,
  },
  {
    title: 'sport center',
    path: '/dashboard/sport-center',
    icon: <WhereToVoteRoundedIcon fontSize="small" />,
  },
  {
    title: 'booking',
    path: '/dashboard/blog',
    icon: <BookOnlineRoundedIcon fontSize="small" />,
  },
  {
    title: 'booking calendar',
    path: '/dashboard/products',
    icon: <CalendarMonthRoundedIcon fontSize="small" />,
  },
];

export default navConfigOwner;
