import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { useFieldArray } from 'react-hook-form';

const SlotsFieldArray = ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `priceOption.${nestIndex}.slots`,
  });

  return (
    <Box>
      {fields.map((item, k) => {
        return (
          <Box key={item.id} mb={2}>
            <Typography variant="subtitle2" gutterBottom>
              Slot {k + 1}
            </Typography>
            <Stack direction="row" alignItems="start" gap={1} width="100%">
              <Stack width="100%" gap={1.5}>
                <Stack direction="row" gap={1.5}>
                  <TimeField
                    fullWidth
                    label="Giờ bắt đầu"
                    color="main"
                    {...register(`priceOption.${nestIndex}.slots.${k}.startTime`)}
                  />
                  <TimeField
                    fullWidth
                    label="Giờ kết thúc"
                    color="main"
                    {...register(`priceOption.${nestIndex}.slots.${k}.endTime`)}
                  />
                </Stack>
              </Stack>

              <IconButton color="error" onClick={() => remove(k)}>
                <RemoveCircleIcon />
              </IconButton>
            </Stack>
          </Box>
        );
      })}

      <Button
        variant="outlined"
        startIcon={<AddToPhotosIcon />}
        onClick={() =>
          append({
            timeStart: '08:00 PM',
            timeEnd: '09:00 PM',
          })
        }
      >
        Thêm slot
      </Button>
    </Box>
  );
};

export default SlotsFieldArray;
