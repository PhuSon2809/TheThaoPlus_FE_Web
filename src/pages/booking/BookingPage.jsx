import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Avatar,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { filter } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Label from 'src/components/label/Label';
import { useModal } from 'src/hooks/useModal';
import BookingListToolbar from 'src/sections/@dashboard/booking/BookingListToolbar';
import BookingTableListHead from 'src/sections/@dashboard/booking/BookingTableListHead';
import { getAllBookings, getBookingDetail } from 'src/services/booking/bookingSlice';
import formatCurrency from 'src/utils/formatPrice';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sport-center', label: 'Trung Tâm', alignRight: false },
  { id: 'sport-field', label: 'Sân', alignRight: false },
  { id: 'total-price', label: 'Tổng Tiền', alignRight: false },
  { id: 'deposit', label: 'Đặt Cọc', alignRight: false },
  { id: 'date', label: 'Ngày Đặt', alignRight: false },
  { id: 'start-time', label: 'Giờ bắt đầu', alignRight: false },
  { id: 'end-time', label: 'Giờ kết thúc', alignRight: false },
  { id: 'status', label: 'Trạng Thái', alignRight: false },
  { id: 'payment', label: 'Thanh Toán', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.sportCenter.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function BookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toogleOpen: toogleOpenDetail, isOpen: isOpenDetail } = useModal();

  const { bookings, booking } = useSelector((state) => state.booking);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('sport-center');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookings.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings.length) : 0;

  const filteredUsers = applySortFilter(bookings, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Thông tin đặt sân | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh Sách Thông Đặt Sân
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{
              backgroundColor: '#00C187',
              '&:hover': {
                backgroundColor: '#30ca9c',
              },
            }}
            onClick={() => {
              navigate('/dashboard/add-booking');
            }}
          >
            Thêm mới
          </Button>
        </Stack>

        <Card>
          <BookingListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <BookingTableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={bookings.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {/* {isLoading ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={9} sx={{ py: 15 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <CircularProgress
                            sx={{
                              color: 'main.main',
                            }}
                          />
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : ( */}
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, sportCenter, sportField, totalPrice, tracking, payments, start, end } = row;

                    return (
                      <TableRow hover key={_id} tabIndex={-1}>
                        <TableCell
                          scope="row"
                          padding="none"
                          sx={{ pl: 2 }}
                          onClick={() => {
                            toogleOpenDetail();
                            dispatch(getBookingDetail(_id));
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ width: 150, fontSize: '0.875rem' }} noWrap>
                            {sportCenter.name}
                          </Typography>
                        </TableCell>

                        <TableCell align="left">{sportField.name}</TableCell>
                        <TableCell align="left">{formatCurrency(totalPrice)}</TableCell>
                        <TableCell align="left">{formatCurrency(totalPrice * 0.25)}</TableCell>
                        <TableCell align="left">{moment(start).format('D-M-YYYY')}</TableCell>
                        <TableCell align="left">{moment(start).format('hh:mm a')}</TableCell>
                        <TableCell align="left">{moment(end).format('hh:mm a')}</TableCell>

                        <TableCell align="left">
                          <Label color={(tracking === 'Pending' && 'warning') || 'success'}>{tracking}</Label>
                        </TableCell>

                        <TableCell align="left">
                          <Label color={(payments === true && 'success') || 'error'}>
                            {payments ? 'Paymented' : 'No payments'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {/* )} */}

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Không tìm thấy
                          </Typography>

                          <Typography variant="body2">
                            Không tìm thấy kết quả cho &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Hãy thử kiểm tra lỗi chính tả hoặc sử dụng các từ hoàn chỉnh.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={bookings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <EditRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>
      </Popover>

      {isOpenDetail && (
        <Dialog
          sx={{
            '.css-154lg22-MuiPaper-root-MuiDialog-paper': {
              width: '60%',
              maxWidth: '60%',
              // height: '60%',
              // maxHeight: '60%',
            },
          }}
          open={isOpenDetail}
          onClose={toogleOpenDetail}
        >
          <DialogContent sx={{ width: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Thông tin đặt sân chi tiết
            </Typography>

            <Grid container spacing={2}>
              <Grid item sm={12} md={5}>
                <img
                  src={booking.sportCenter?.image}
                  alt={booking.sportCenter?.name}
                  style={{ borderRadius: '10px' }}
                />
              </Grid>
              <Grid item sm={12} md={7}>
                <Stack gap={1}>
                  <Typography variant="h3" color="main.main">
                    {booking.sportCenter?.name}
                  </Typography>

                  <Stack direction="row" alignItems="center">
                    <LocationOnIcon sx={{ color: 'main.main' }} />
                    <Typography>{booking.sportCenter?.address}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography sx={{ fontSize: '20px' }}>Sân:</Typography>
                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{booking.sportField?.name}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <img src="/assets/images/SportType.png" alt="sport-type" width={25} height={25} />
                    <Typography>{booking.sportField?.fieldType}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="h6">Ngày đặt:</Typography>
                    <Typography variant="h5" sx={{ color: 'main.main' }}>
                      {moment(booking.start).format('D-M-YYYY')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="h6">Thời gian bắt đầu:</Typography>
                    <Typography variant="h5" sx={{ color: 'main.main' }}>
                      {moment(booking.start).format('hh:mm a')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="h6">Thời gian kết thúc:</Typography>
                    <Typography variant="h5" sx={{ color: 'main.main' }}>
                      {moment(booking.end).format('hh:mm a')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={3}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="h6">Tổng tiền:</Typography>
                      <Typography variant="h5" sx={{ color: 'main.main' }}>
                        {formatCurrency(booking.sportField?.price)}
                      </Typography>
                    </Stack>

                    {/* <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="h6">Đặt cọc:</Typography>
                      <Typography variant="h5" sx={{ color: 'main.main' }}>
                        {formatCurrency(booking.sportField?.price * 0.25)}
                      </Typography>
                    </Stack> */}
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={3}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="h6">Trạng thái:</Typography>
                      <Label color={(booking.tracking === 'Pending' && 'warning') || 'success'}>
                        {booking.tracking}
                      </Label>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="h6">Thanh Toán:</Typography>
                      <Label color={(booking.payments === true && 'success') || 'error'}>
                        {booking.payments ? 'Paymented' : 'No payments'}
                      </Label>
                    </Stack>
                  </Stack>

                  <Typography variant="subtitle1" color="main.main">
                    Thông tin khách hàng:
                  </Typography>

                  <Stack direction="row" alignItems="center" gap={1}>
                    <Avatar />

                    <Stack>
                      <Typography variant="subtitle1">{booking.userBooking}</Typography>
                      <Typography>0{booking.phoneBooking}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" size="small" onClick={toogleOpenDetail}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default BookingPage;
