import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  MenuItem,
  Popover,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Label from 'src/components/label/Label';
import { useModal } from 'src/hooks/useModal';
import {
  activeSportField,
  deactiveSportField,
  deleteSportField,
  setEditSportField,
} from 'src/services/sportField/sportFieldSlice';
import formatCurrency from 'src/utils/formatPrice';

function SportFieldDetail({ isOpenDetail, toogleOpenDetail, sportField }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toogleOpen, isOpen } = useModal();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      {isOpenDetail && (
        <Dialog
          sx={{
            '.css-154lg22-MuiPaper-root-MuiDialog-paper': {
              width: '70%',
              height: '80%',
              maxWidth: '70%',
              maxHeight: '80%',
            },
          }}
          open={isOpenDetail}
          onClose={toogleOpenDetail}
        >
          <DialogContent sx={{ width: '100%' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h4">Sân: {sportField.name}</Typography>

              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            </Stack>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={8}>
                <ImageList cols={2} gap={8} sx={{ height: '490px' }}>
                  {sportField.images?.map((image, index) => (
                    <ImageListItem key={index}>
                      <img src={image} alt="sport" loading="lazy" />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Stack gap={2}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" gap={1}>
                      <img src="/assets/images/SportType.png" alt="sport-type" width={25} height={25} />
                      <Typography>{sportField.fieldType}</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="h5">Price:</Typography>
                      <Typography variant="h5" sx={{ color: 'main.main' }}>
                        {formatCurrency(sportField.price)}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Label
                      color={(sportField.status === false && 'error') || 'success'}
                      sx={{ p: 2, fontSize: '20px' }}
                    >
                      {sportField.status ? 'Hoạt động' : 'Không hoạt động'}
                    </Label>
                    <FormControlLabel
                      control={
                        <Switch
                          color="success"
                          checked={sportField.status}
                          onClick={() =>
                            dispatch(
                              sportField.status
                                ? deactiveSportField({ sportCenterId: id, sportFieldId: sportField._id })
                                : activeSportField({ sportCenterId: id, sportFieldId: sportField._id }),
                              toogleOpenDetail()
                            )
                          }
                        />
                      }
                    />
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
            <Typography variant="subtitle1">Bạn có muốn xóa sân thể thao này không??</Typography>
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
                dispatch(deleteSportField({ sportCenterId: id, sportFieldId: sportField._id }));
                toogleOpen();
              }}
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      )}

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
        <MenuItem
          onClick={() => {
            dispatch(setEditSportField(sportField));
            navigate(`/dashboard/add-sport-field/${id}`);
          }}
        >
          <EditRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={toogleOpen}>
          <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>
    </>
  );
}

export default SportFieldDetail;
