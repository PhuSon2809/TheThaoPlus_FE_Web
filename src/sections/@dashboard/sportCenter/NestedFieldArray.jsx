import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFieldArray } from 'react-hook-form';

const listDay = [
  { id: 1, name: 'Thứ hai', value: 0 },
  { id: 2, name: 'Thứ ba', value: 1 },
  { id: 3, name: 'Thứ tư', value: 2 },
  { id: 4, name: 'Thứ năm', value: 3 },
  { id: 5, name: 'Thứ sáu', value: 4 },
  { id: 6, name: 'Thứ bảy', value: 5 },
  { id: 7, name: 'Chủ nhật', value: 6 },
];

const NestedFieldArray = ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `priceOption.${nestIndex}.listPrice`,
  });

  return (
    <Box>
      {fields.map((item, k) => {
        return (
          <Box key={item.id} mb={2}>
            <Typography variant="subtitle2" gutterBottom>
              Bảng giá {k + 1}
            </Typography>
            <Stack direction="row" alignItems="start" gap={1} width="100%">
              <Stack width="100%" gap={1.5}>
                <Stack direction="row" gap={1.5}>
                  <FormControl fullWidth>
                    <InputLabel id="sport-label" color="main">
                      Ngày bắt đầu
                    </InputLabel>
                    <Select
                      labelId="sport-label"
                      id="demo-simple-select-helper"
                      label="Ngày bắt đầu"
                      color="main"
                      {...register(`priceOption.${nestIndex}.listPrice.${k}.timeStart`)}
                    >
                      {listDay.map((day) => (
                        <MenuItem key={day.id} value={day.value} sx={{ textTransform: 'capitalize' }}>
                          {day.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="sport-label" color="main">
                      Ngày kết thúc
                    </InputLabel>
                    <Select
                      labelId="sport-label"
                      id="demo-simple-select-helper"
                      label="Ngày kết thúc"
                      color="main"
                      {...register(`priceOption.${nestIndex}.listPrice.${k}.timeEnd`)}
                    >
                      {listDay.map((day) => (
                        <MenuItem key={day.id} value={day.value} sx={{ textTransform: 'capitalize' }}>
                          {day.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    type="number"
                    color="main"
                    label="Giá tiền"
                    {...register(`priceOption.${nestIndex}.listPrice.${k}.price`, { require: true })}
                  />
                </FormControl>
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
            timeStart: 0,
            timeEnd: 3,
            price: 400000,
          })
        }
      >
        Thêm bảng giá
      </Button>
    </Box>
  );
};

export default NestedFieldArray;
