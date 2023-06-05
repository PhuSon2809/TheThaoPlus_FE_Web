import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import AddSportFieldForm from 'src/sections/@dashboard/sportField/AddSportFieldForm';

const AddSportFieldPage = () => {
  return (
    <>
      <Helmet>
        <title> Add Sport field | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add New Sport field
          </Typography>
        </Stack>
        <AddSportFieldForm />
      </Container>
    </>
  );
};

export default AddSportFieldPage;
