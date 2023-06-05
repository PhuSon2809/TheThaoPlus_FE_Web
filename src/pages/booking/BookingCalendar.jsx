import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'src/hooks/useModal';
import './Booking.css';
import moment from 'moment';
import CalendarComponent from 'src/components/calendar/CalendarComponent';

const events = [
  {
    start: moment('2023-06-05T10:00:00').toDate(),
    end: moment('2023-06-05T11:00:00').toDate(),
    title: 'MRI Registration',
  },
  {
    start: moment('2023-06-05T14:00:00').toDate(),
    end: moment('2023-06-05T15:30:00').toDate(),
    title: 'ENT Appointment',
  },
];

function BookingCalendarPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toogleOpen, isOpen } = useModal();

  const { sportCenterOfOwner } = useSelector((state) => state.sportCenter);
  console.log(sportCenterOfOwner);

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <Helmet>
        <title> Booking Calendar | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Booking Calendar
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
              navigate('/dashboard/add-sport-center');
            }}
          >
            New Sport Center
          </Button>
        </Stack>

        <Card sx={{ p: 2 }}>
          <CalendarComponent
            events={events}
            formats={{ dayHeaderFormat: (date) => moment(date).format('dddd @ DD') }}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <EditRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={toogleOpen}>
          <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {isOpen && (
        <Dialog
          sx={{
            '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
              width: '300px',
              maxWidth: '300px',
            },
          }}
          open={isOpen}
          onClose={toogleOpen}
        >
          <DialogContent sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Do you want to remove this sport?</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" size="small" onClick={toogleOpen}>
              Close
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                // dispatch(deleteSportCenter(idToDelete));
                toogleOpen();
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default BookingCalendarPage;
