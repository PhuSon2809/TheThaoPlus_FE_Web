import { Box, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import { ProductFilterSidebar, ProductSort } from '../products';
import SportFieldCard from '../sportField/SportFieldCard';
import { useSelector } from 'react-redux';

function ListSportField() {
  const { sportFields } = useSelector((state) => state.sportField);
  console.log(sportFields);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Box>
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilterSidebar
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {sportFields.map((sportField) => (
          <Grid key={sportField._id} item xs={12} sm={6} md={3}>
            <SportFieldCard sportField={sportField} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ListSportField;
