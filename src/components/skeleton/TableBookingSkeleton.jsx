import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';
import Iconify from '../iconify';

function TableBookingSkeleton({ length }) {
  return (
    <TableBody>
      {Array.from({ length: length }).map((_, index) => (
        <TableRow key={index}>
          <TableCell align="center" width={60}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={15} />
            </Stack>
          </TableCell>

          <TableCell scope="row" padding="none" width={182.72}>
            <Skeleton />
          </TableCell>

          <TableCell align="left" width={182.72}>
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton width={60} />
          </TableCell>
          <TableCell align="left">
            <Skeleton width={60} />
          </TableCell>

          <TableCell align="left">
            <Skeleton variant="rounded" width={77} height={20} />
          </TableCell>

          <TableCell align="left">
            <Skeleton />
          </TableCell>

          <TableCell align="left">
            <Skeleton variant="rounded" width={90} height={20} />
          </TableCell>

          <TableCell align="right">
            <IconButton size="large" color="inherit">
              <Iconify icon={'eva:more-vertical-fill'} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TableBookingSkeleton;
