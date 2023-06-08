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
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Ccác Môn Thể Thao | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Tất cả các môn thể thao trong hệ thống
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 5, opacity: 0.72 }}>
          Thêm các môn thể thao vào hệ thống trung tâm thể thao của bạn.
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
            Trở lại
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default AllSportPage;
