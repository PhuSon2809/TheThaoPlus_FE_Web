import { FormControl, MenuItem, Select, Typography } from '@mui/material';

function SelectAddress({ label, options, value, setValue, type, reset, name }) {
  return (
    <FormControl fullWidth>
      <Typography variant="subtitle2">{label}</Typography>
      <Select
        color="main"
        labelId="sport-label"
        value={reset ? '' : value}
        onChange={(e) => (!name ? setValue(e.target.value) : setValue((prev) => ({ ...prev, [name]: e.target.value })))}
      >
        <MenuItem value="">{`--Choose ${label}--`}</MenuItem>
        {options?.map((item) => {
          return (
            <MenuItem
              key={type === 'province' ? item?.province_id : type === 'district' ? item?.district_id : item?.code}
              value={type === 'province' ? item?.province_id : type === 'district' ? item?.district_id : item?.code}
            >
              {type === 'province' ? item?.province_name : type === 'district' ? item?.district_name : item?.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default SelectAddress;
