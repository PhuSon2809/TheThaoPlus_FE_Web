import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MapIcon from '@mui/icons-material/Map';
import {
  Button,
  Card,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'src/hooks/useModal';
import SportCenterMapView from 'src/sections/@dashboard/sportCenter/SportCenterMapView';
import {
  activeSportCenter,
  deactiveSportCenter,
  deleteSportCenter,
  getSportCentersOfOwner,
} from 'src/services/sportCenter/sportCenterSlice';
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
import { TableListHead, UserListToolbar } from '../../sections/@dashboard/table';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên Trung Tâm', alignRight: false },
  { id: 'address', label: 'Địa Chỉ', alignRight: false },
  { id: 'openTime', label: 'Giờ Mở Cửa', alignRight: false },
  { id: 'closeTime', label: 'Giờ Đóng Cửa', alignRight: false },
  { id: 'sport', label: 'Môn Thể Thao', alignRight: false },
  { id: 'quantity', label: 'Số Lượng', alignRight: false },
  { id: 'status', label: 'Trang Thái', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function SportCenterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toogleOpen, isOpen } = useModal();
  const { toogleOpen: toogleOpenMap, isOpen: isOpenMap } = useModal();

  const { sportCenterOfOwner } = useSelector((state) => state.sportCenter);

  const [open, setOpen] = useState(null);

  const [idToDelete, setIdToDelete] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getSportCentersOfOwner());
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
      const newSelecteds = sportCenterOfOwner.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sportCenterOfOwner.length) : 0;

  const filteredUsers = applySortFilter(sportCenterOfOwner, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Trung Tâm Thể Thao | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Trung Tâm Thể Thao
          </Typography>
          <Stack direction="row" alignItems="center" gap={2}>
            <Button
              variant="contained"
              startIcon={<MapIcon />}
              // onClick={() => {
              //   navigate('/dashboard/sport-center-map');
              // }}
              onClick={toogleOpenMap}
            >
              Xem bản đồ
            </Button>
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
                navigate('/dashboard/add-sport-center');
              }}
            >
              Thêm mới
            </Button>
          </Stack>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={sportCenterOfOwner.length}
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
                    const { _id, name, address, closeTime, openTime, sport, sportFields, status } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell
                          scope="row"
                          padding="none"
                          onClick={() => {
                            navigate(`/dashboard/sport-center-detail/${_id}`);
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ width: 150, fontSize: '0.875rem' }} noWrap>
                            {name}
                          </Typography>
                        </TableCell>

                        <TableCell align="left">
                          <Typography sx={{ width: 150, fontSize: '0.875rem' }} noWrap>
                            {address}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{openTime}</TableCell>
                        <TableCell align="left">{closeTime}</TableCell>

                        <TableCell align="left">
                          <Label
                            color={
                              sport.name === 'bóng đá'
                                ? 'success'
                                : sport.name === 'bóng rổ'
                                ? 'warning'
                                : sport.name === 'cầu lông'
                                ? 'primary'
                                : 'error'
                            }
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {sport.name}
                          </Label>
                        </TableCell>

                        <TableCell align="left">{sportFields.length} sân</TableCell>

                        <TableCell align="left" sx={{ width: 100 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                size="small"
                                color="success"
                                checked={status}
                                onClick={() => dispatch(status ? deactiveSportCenter(_id) : activeSportCenter(_id))}
                              />
                            }
                            label={
                              <Label color={(status === false && 'error') || 'success'}>
                                {status ? 'Hoạt động' : 'Không hoạt động'}
                              </Label>
                            }
                          />
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify
                              icon={'eva:more-vertical-fill'}
                              onClick={() => {
                                setIdToDelete({ sportCenterId: _id, sportId: sport._id });
                              }}
                            />
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
            count={sportCenterOfOwner.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      {isOpenMap && <SportCenterMapView isOpenMap={isOpenMap} toogleOpenMap={toogleOpenMap} />}

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

        <MenuItem sx={{ color: 'error.main' }} onClick={toogleOpen}>
          <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>

      {isOpen && (
        <Dialog
          sx={{
            '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
              width: '300px',
              maxWidth: '300px',
            },
          }}
          open={isOpen}
          onClose={toogleOpen}
        >
          <DialogContent sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Bạn có muốn xóa trung tâm thể thao này không?</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" size="small" onClick={toogleOpen}>
              Đóng
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                dispatch(deleteSportCenter(idToDelete));
                toogleOpen();
              }}
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default SportCenterPage;
