import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import AddSportCenterForm from 'src/sections/@dashboard/sportCenter/AddSportCenterForm';

const AddSportCenterPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Thêm trung tâm thể thao mới | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Thêm trung tâm thể thao mới
          </Typography>
        </Stack>
        <AddSportCenterForm />
      </Container>
    </>
  );
};

export default AddSportCenterPage;
