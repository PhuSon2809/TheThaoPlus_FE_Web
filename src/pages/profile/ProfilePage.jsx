import { Avatar, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import { useModal } from 'src/hooks/useModal';
import UpdateInformation from 'src/sections/@dashboard/profile/UpdateInformation';
import UpdatePassword from 'src/sections/@dashboard/profile/UpdatePassword';
import { setEditUser } from 'src/services/auth/authSlice';
import moment from 'moment';
import ProfileSkeleton from 'src/components/skeleton/ProfileSkeleton';

function ProfilePage(props) {
  const dispatch = useDispatch();

  const { isLoading, user } = useSelector((state) => state.auth);

  const { toogleOpen, isOpen } = useModal();
  const { toogleOpen: toogleOpenPassword, isOpen: isOpenPassword } = useModal();

  return (
    <>
      <Helmet>
        <title> Trung Tâm Thể Thao | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Typography variant="h4" mb={5}>
          Thông Tin Tài Khoản
        </Typography>

        <Grid container columnSpacing={4}>
          <Grid item md={9}>
            {isLoading ? (
              <ProfileSkeleton />
            ) : (
              <Card>
                <Grid container columnSpacing={5} sx={{ p: 4 }}>
                  <Grid item md={4}>
                    <Avatar src={user?.image} alt={user.lastname} sx={{ width: 250, height: 250 }} />
                  </Grid>
                  <Grid item md={8}>
                    <Stack direction="column" gap={2} fullWidth>
                      <Typography component="h6" variant="h3">
                        {user.firstname} {user.lastname}
                      </Typography>

                      <Stack direction="row" justifyContent="space-between" fullWidth>
                        <Stack direction="row" gap={1}>
                          <LocalPhoneRoundedIcon color="main" />
                          <Typography>{user.phone}</Typography>
                        </Stack>
                        <Stack direction="row" gap={1}>
                          <EmailIcon color="main" />
                          <Typography>{user.email}</Typography>
                        </Stack>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between" fullWidth>
                        <Stack direction="row" gap={1}>
                          <Typography>Gender:</Typography>
                          <Typography textTransform="capitalize">{user.gender}</Typography>
                        </Stack>
                        <Stack direction="row" gap={1}>
                          <Typography>YOB:</Typography>
                          <Typography textTransform="capitalize">{moment(user.YOB).format('DD-MM-YYYY')}</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            )}
          </Grid>
          <Grid item md={3} spacing={2}>
            <Stack direction="column" spacing={2}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                fullWidth
                color="warning"
                onClick={() => {
                  toogleOpen();
                  dispatch(setEditUser());
                }}
              >
                Cập nhật thông tin
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                fullWidth
                color="warning"
                onClick={toogleOpenPassword}
              >
                Thay đổi mật khẩu
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {isOpen && <UpdateInformation isOpen={isOpen} toogleOpen={toogleOpen} />}

      {isOpenPassword && <UpdatePassword isOpenPassword={isOpenPassword} toogleOpenPassword={toogleOpenPassword} />}
    </>
  );
}

export default ProfilePage;
