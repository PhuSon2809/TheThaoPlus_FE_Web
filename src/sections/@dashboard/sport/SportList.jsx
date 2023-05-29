import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import SportCard from './SportCard';

function SportList({ sports, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {sports.map((sport) => (
        <Grid key={sport._id} item xs={12} sm={6} md={3}>
          <SportCard sport={sport} />
        </Grid>
      ))}
    </Grid>
  );
}

export default SportList;

SportList.propTypes = {
  sports: PropTypes.array.isRequired,
};
