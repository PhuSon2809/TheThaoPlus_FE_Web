import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Skeleton,
  Switch,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import Iconify from '../../components/iconify';

function TableSportCenterSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell padding="checkbox">
            <Checkbox />
          </TableCell>

          <TableCell scope="row" padding="none">
            <Skeleton />
          </TableCell>

          <TableCell align="left">
            <Skeleton width={120} />
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

          <TableCell align="left" sx={{ width: 100 }}>
            <FormControlLabel
              control={<Switch size="small" color="success" checked={true} />}
              label={<Skeleton variant="rounded" width={77} height={20} />}
            />
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

export default TableSportCenterSkeleton;
