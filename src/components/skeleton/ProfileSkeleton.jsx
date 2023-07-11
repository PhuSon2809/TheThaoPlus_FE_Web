import { Card, Grid, Skeleton, Stack } from '@mui/material';

function ProfileSkeleton() {
  return (
    <Card>
      <Grid container columnSpacing={5} sx={{ p: 4 }}>
        <Grid item md={4}>
          <Skeleton variant="circular" width={250} height={250} />
        </Grid>
        <Grid item md={8}>
          <Stack direction="column" gap={2} fullWidth>
            <Skeleton variant="text" sx={{ fontSize: '32px' }} />

            <Stack direction="row" justifyContent="space-between" fullWidth>
              <Stack direction="row" gap={1}>
                <Skeleton variant="rounded" width={100} height={30} />
              </Stack>
              <Stack direction="row" gap={1}>
                <Skeleton variant="rounded" width={100} height={30} />
              </Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between" fullWidth>
              <Stack direction="row" gap={1}>
                <Skeleton variant="rounded" width={100} height={30} />
              </Stack>
              <Stack direction="row" gap={1}>
                <Skeleton variant="rounded" width={100} height={30} />
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProfileSkeleton;
