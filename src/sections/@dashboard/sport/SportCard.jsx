import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { Button, Card, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addSportList } from 'src/services/sport/sportSlice';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(10),
  height: theme.spacing(10),
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

// ----------------------------------------------------------------------

function SportCard({ sport, color = 'main', sx, ...other }) {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        py: 4,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(155deg, ${alpha(theme.palette[color].main, 0)} 0%, ${alpha(
              theme.palette[color].main,
              0.24
            )} 100%)`,
        }}
      >
        <img src={sport.image} alt={sport.name} style={{ maxWidth: 105 }} />
      </StyledIcon>

      <Typography variant="subtitle1" sx={{ mb: 2, textTransform: 'capitalize' }}>
        {sport.name}
      </Typography>

      {sport.add ? (
        <Button
          variant="contained"
          startIcon={<CheckCircleOutlineRoundedIcon />}
          color="warning"
          onClick={() => {
            dispatch(addSportList(sport._id));
          }}
        >
          Đã thêm
        </Button>
      ) : (
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
            dispatch(addSportList(sport._id));
          }}
        >
          Thêm mới
        </Button>
      )}
    </Card>
  );
}

export default SportCard;

SportCard.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
};
