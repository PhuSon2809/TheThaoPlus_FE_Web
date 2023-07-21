import { Grid, Skeleton, Stack } from '@mui/material';

function BookingDetailSkeleton() {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={4}>
        <Skeleton variant="rounded" height={150} sx={{ mt: 1 }} />

        <Stack direction="column" mt={2} gap={1}>
          <Skeleton variant="text" />

          <Stack direction="row" alignItems="center" gap={1}>
            <Skeleton variant="circular" width={50} height={50} />

            <Stack>
              <Skeleton width={120} />
              <Skeleton width={100} />
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item sm={12} md={8}>
        <Stack gap={1}>
          <Skeleton variant="text" sx={{ fontSize: '32px' }} width={400} />

          <Stack direction="row">
            <Skeleton width={563} />
            <Skeleton width={563} />
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            <Skeleton width={100} />
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            <Skeleton width={200} />
          </Stack>

          <Stack direction="row" gap={12}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Skeleton width={200} />
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <Skeleton width={200} />
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" gap={13}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Skeleton width={100} />
              <Skeleton variant="rounded" width={90} height={20} />
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <Skeleton width={100} />
              <Skeleton variant="rounded" width={90} height={20} />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
            sx={{ backgroundColor: 'grey.200', p: 1, mt: 2 }}
          >
            <Skeleton variant="text" sx={{ fontSize: '32px' }} width={200} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default BookingDetailSkeleton;
