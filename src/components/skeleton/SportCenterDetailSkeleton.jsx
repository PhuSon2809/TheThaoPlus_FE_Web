import { Box, Card, Divider, Grid, Skeleton, Stack } from '@mui/material';

function SportCenterDetailSkeleton() {
  return (
    <Grid container spacing={4}>
      <Grid item sm={12} md={12}>
        <Box sx={{ position: 'relative' }}>
          <img
            src="/assets/images/sport6.jpg"
            alt="cover"
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
          <Box
            sx={{
              width: '100%',
              height: '300px',
              background: '#000',
              opacity: 0.8,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          ></Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={8} md={7}>
        <Skeleton variant="text" sx={{ fontSize: '48px' }} />

        <Divider sx={{ my: 3 }}></Divider>

        <Stack gap={1}>
          <Skeleton variant="text" sx={{ width: '250px' }} />

          <Stack gap={0.5}>
            <Skeleton variant="text" sx={{ width: '100%' }} />
            <Skeleton variant="text" sx={{ width: '100%' }} />
            <Skeleton variant="text" sx={{ width: '100%' }} />
            <Skeleton variant="text" sx={{ width: '100%' }} />
            <Skeleton variant="text" sx={{ width: '100%' }} />
            <Skeleton variant="text" sx={{ width: '50%' }} />
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }}></Divider>

        <Stack gap={1}>
          <Skeleton variant="text" sx={{ width: '100px' }} />

          <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
            {Array.from({ length: 5 }).map((item) => (
              <Skeleton variant="rounded" sx={{ width: '250px', height: '24px' }} />
            ))}
          </Stack>

          <Skeleton variant="text" sx={{ width: '100px', mt: 2 }} />

          <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
            {Array.from({ length: 2 }).map((item) => (
              <Skeleton variant="rounded" sx={{ width: '250px', height: '24px' }} />
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }}></Divider>

        <Stack>
          <Skeleton variant="text" sx={{ width: '100px', mb: 1 }} />
          <Stack direction="row" alignItems="center" gap={1}>
            <Skeleton variant="circular" sx={{ width: '60px', height: '60px' }} />
            <Skeleton variant="text" sx={{ width: '100px' }} />
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={4} md={5}>
        <Stack gap={4}>
          <Skeleton variant="rounded" sx={{ width: '461.33px', height: '48px' }} />

          <Card sx={{ p: 2 }}>
            <Skeleton variant="text" sx={{ p: 1, mb: 2 }} />

            <Stack spacing={1}>
              <Stack direction="column" gap="2px">
                <Skeleton variant="text" sx={{ width: '100%' }} />
                <Skeleton variant="text" sx={{ width: '50%' }} />
              </Stack>
              <Stack direction="row" gap={1}>
                <Skeleton variant="text" sx={{ width: '40%' }} />
              </Stack>
            </Stack>

            <Skeleton variant="text" sx={{ mt: 2, width: '50%' }} />
          </Card>
          <Skeleton variant="rounded" sx={{ width: '461.33px', height: '300px' }} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SportCenterDetailSkeleton;
