import { Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

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

          <TableCell align="left">
            <Skeleton width={60} />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton width={100} />
          </TableCell>

          <TableCell align="left">
            <Skeleton width={80} />
          </TableCell>

          <TableCell align="left">
            <Skeleton width={80} />
          </TableCell>

          <TableCell align="left">
            <Skeleton variant="rounded" width={90} height={20} />
          </TableCell>
          <TableCell align="left">
            <Skeleton variant="rounded" width={90} height={20} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TableBookingSkeleton;
