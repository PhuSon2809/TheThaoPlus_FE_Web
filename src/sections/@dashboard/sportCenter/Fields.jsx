import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFieldArray } from 'react-hook-form';
import NestedFieldArray from './NestedFieldArray';
import { Button, Card, FormControl, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Fields({ control, register, setValue, getValues, resetForm, defaultValuePrice }) {
  const { fields, remove } = useFieldArray({
    control,
    name: 'priceOption',
  });

  return (
    <>
      <Grid container spacing={2}>
        {fields.map((item, index) => {
          return (
            <Grid item xs={12} md={6} key={item.id}>
              <Card sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={40} mb={1}>
                  <Typography variant="subtitle1">Loại sân {index + 1}</Typography>

                  {index > 0 && (
                    <IconButton color="error" onClick={() => remove(index)}>
                      <CancelIcon />
                    </IconButton>
                  )}
                </Stack>

                <Stack direction="column" gap={1}>
                  <FormControl fullWidth>
                    <TextField
                      {...register(`priceOption.${index}.fieldType`, { require: true })}
                      label="Loại sân"
                      color="main"
                    />
                  </FormControl>

                  <NestedFieldArray nestIndex={index} {...{ control, register }} />
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Stack direction="row" justifyContent="end" gap={2}>
        <Button
          variant="outlined"
          startIcon={<AddToPhotosIcon />}
          onClick={() => {
            setValue('priceOption', [
              ...(getValues().priceOption || []),
              {
                fieldType: 'Loại sân',
                listPrice: [{ timeStart: 0, timeEnd: 3, price: 0 }],
              },
            ]);
          }}
        >
          Thêm loại sân
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<RefreshIcon />}
          onClick={() => resetForm(defaultValuePrice)}
        >
          Thiết lập lại
        </Button>
      </Stack>
    </>
  );
}
