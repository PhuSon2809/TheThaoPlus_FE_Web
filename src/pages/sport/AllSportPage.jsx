import { Button, Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AllSportSort, SportList } from 'src/sections/@dashboard/sport';
import { getAllSports } from 'src/services/sport/sportSlice';

function AllSportPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sports } = useSelector((state) => state.sport);

  useEffect(() => {
    dispatch(getAllSports());
  }, []);

  return (
    <>
      <Helmet>
        <title> All Sports | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 1 }}>
          All sport in the system
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 5, opacity: 0.72 }}>
          Add sports to your sports center system.
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <AllSportSort />
        </Stack>

        <SportList sports={sports} />

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mt: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/dashboard/sport');
            }}
          >
            Back
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default AllSportPage;
