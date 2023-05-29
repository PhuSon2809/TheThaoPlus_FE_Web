import React from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from 'react-router-dom';

const AddSportCenterPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Add Sport center | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
            Add New Sport Center
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
          >
            New Sport Center
          </Button>
        </Stack>
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
};

export default AddSportCenterPage;
