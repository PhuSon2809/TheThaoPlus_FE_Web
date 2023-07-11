import { Grid, Skeleton, Stack } from '@mui/material';

function MapCardSkeleton() {
  return (
    <Grid container spacing={1}>
      <Grid item md={5}>
        <Skeleton variant="rectangular" width="100%" height={80} />
      </Grid>
      <Grid item md={7}>
        <Skeleton sx={{ fontSize: 16 }} />
        <Skeleton sx={{ fontSize: 16 }} />
        <Skeleton variant="rounded" width={77} height={20} sx={{ mt: 1 }} />
      </Grid>
      <Stack width="100%" direction="column" ml={1} mt={1}>
        <Skeleton sx={{ fontSize: 14 }} width="100%" />
        <Skeleton sx={{ fontSize: 14 }} width="100%" />
      </Stack>
    </Grid>
  );
}

export default MapCardSkeleton;
