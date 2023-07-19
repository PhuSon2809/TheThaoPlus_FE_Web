import { Grid, Skeleton } from '@mui/material';

function SportCardSkeleton({ length }) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: length }).map((_, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Skeleton variant="rounded" width={270} height={236} sx={{ mt: 1 }} />
        </Grid>
      ))}
    </Grid>
  );
}

export default SportCardSkeleton;
