import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

function TableSportSkeleton({ length }) {
  return (
    <TableBody>
      {Array.from({ length: length }).map((_, index) => (
        <TableRow key={index}>
          <TableCell align="center" width={60}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={15} />
            </Stack>
          </TableCell>

          <TableCell component="th" scope="row" padding="none" width={356}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton width={100} />
            </Stack>
          </TableCell>

          <TableCell align="left" width={344}>
            <Skeleton width={140} />
          </TableCell>

          <TableCell align="left">
            <Skeleton variant="rounded" width={90} height={20} />
          </TableCell>

          <TableCell align="right">
            <IconButton size="large" color="inherit">
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TableSportSkeleton;
