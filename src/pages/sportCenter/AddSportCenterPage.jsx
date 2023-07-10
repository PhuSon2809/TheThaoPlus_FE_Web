import { Container, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import AddSportCenterForm from 'src/sections/@dashboard/sportCenter/AddSportCenterForm';

const AddSportCenterPage = () => {
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
