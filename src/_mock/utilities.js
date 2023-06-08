import CameraOutdoorRoundedIcon from '@mui/icons-material/CameraOutdoorRounded';
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded';
import DriveEtaRoundedIcon from '@mui/icons-material/DriveEtaRounded';
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';

export const Utilities = [
  {
    id: '1',
    name: 'Bãi đậu xe',
    icon: <DriveEtaRoundedIcon sx={{ color: 'main.main' }} />,
  },
  {
    id: '2',
    name: 'Phòng thay đồ',
    icon: <CheckroomRoundedIcon sx={{ color: 'main.main' }} />,
  },

  {
    id: '3',
    name: 'Quán nước',
    icon: <StoreRoundedIcon sx={{ color: 'main.main' }} />,
  },
  {
    id: '4',
    name: 'Camera',
    icon: <CameraOutdoorRoundedIcon sx={{ color: 'main.main' }} />,
  },
  {
    id: '5',
    name: 'Khu vực chờ',
    icon: <RoofingRoundedIcon sx={{ color: 'main.main' }} />,
  },
];

export const UtilitieNote = [
  {
    id: '1',
    name: 'Phải đặt cọc trước',
  },
  {
    id: '2',
    name: 'Nước uống tốn phí',
  },
];
