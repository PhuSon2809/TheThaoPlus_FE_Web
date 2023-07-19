import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CommentIcon from '@mui/icons-material/Comment';
import {
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  Paper,
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
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableSportSkeleton from 'src/components/skeleton/TableSportSkeleton';
import { SportListToolbar, SportTableRow } from 'src/sections/@dashboard/sport';
import { getSportOfOwner } from 'src/services/sport/sportSlice';
import Scrollbar from '../../components/scrollbar';
import { TableListHead } from '../../sections/@dashboard/table';

const TABLE_HEAD = [
  { id: 'name', label: 'Tên môn thể thao', alignRight: false },
  { id: 'quantity', label: 'Số lượng', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
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

function SportPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sportsOfOwner, isLoading } = useSelector((state) => state.sport);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getSportOfOwner());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sportsOfOwner.length) : 0;

  const filteredSports = applySortFilter(sportsOfOwner, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredSports.length && !!filterName;
  const lenght = sportsOfOwner.length <= 5 ? sportsOfOwner.length : 5;
  console.log(lenght);

  return (
    <>
      <Helmet>
        <title> Môn Thể Thao | TheThaoPlus </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh sách các môn thể thao
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
              navigate('/dashboard/all-sport-system');
            }}
          >
            Thêm mới
          </Button>
        </Stack>

        <Card>
          <SportListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                {isLoading ? (
                  <TableBody>
                    {filteredSports.length === 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                              py: 15,
                            }}
                          >
                            <CircularProgress color="main" />
                          </Paper>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                ) : (
                  <TableBody>
                    {filteredSports.length === 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                              py: 10,
                            }}
                          >
                            <IconButton color="inherit">
                              <CommentIcon sx={{ fontSize: 80 }} />
                            </IconButton>
                            <Typography variant="h6">Không có môn thể thao nào trong danh sách</Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                )}

                {isLoading ? (
                  <TableSportSkeleton length={filteredSports.length} />
                ) : (
                  <TableBody>
                    {filteredSports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const { _id } = row;

                      return <SportTableRow key={_id} sportRow={row} index={index} />;
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                )}

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
            count={sportsOfOwner.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

export default SportPage;
