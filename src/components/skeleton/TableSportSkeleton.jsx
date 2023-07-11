import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { Checkbox, IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

function TableSportSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell padding="checkbox">
            <Checkbox />
          </TableCell>

          <TableCell component="th" scope="row" padding="none">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton variant="rounded" width={100} height={16} />
            </Stack>
          </TableCell>

          <TableCell align="left">
            <Skeleton variant="rounded" width={160} height={16} />
          </TableCell>

          <TableCell align="left">
            <Skeleton variant="rounded" width={77} height={20} />
          </TableCell>

          <TableCell align="right">
            <IconButton size="large" color="error">
              <RemoveCircleRoundedIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TableSportSkeleton;
