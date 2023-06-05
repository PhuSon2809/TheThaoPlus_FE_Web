import PropTypes from 'prop-types';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../../../components/label';
import { useModal } from 'src/hooks/useModal';
import SportFieldDetail from './SportFieldDetail';
import formatCurrency from 'src/utils/formatPrice';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

function SportFieldCard({ sportField }) {
  const { _id, name, images, price, status, fieldType } = sportField;

  const { toogleOpen, isOpen } = useModal();
  const { toogleOpen: toogleOpenDetail, isOpen: isOpenDetail } = useModal();

  return (
    <>
      <Card onClick={toogleOpenDetail}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <Label
            variant="filled"
            color={(status === false && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status === false ? 'Deactive' : 'Active'}
          </Label>
          <StyledProductImg alt={name} src={images[0]} />
        </Box>

        <Stack spacing={2} sx={{ p: 2 }}>
          <Link color="inherit" underline="hover">
            <Typography variant="h6" noWrap>
              {name}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" gap={1}>
              <img src="/assets/images/SportType.png" alt="sport-type" width={25} height={25} />
              <Typography>{fieldType}</Typography>
            </Stack>
            <Typography variant="subtitle1">{formatCurrency(price)}</Typography>
          </Stack>
        </Stack>
      </Card>

      {isOpenDetail && (
        <SportFieldDetail isOpenDetail={isOpenDetail} toogleOpenDetail={toogleOpenDetail} sportField={sportField} />
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
            <Typography variant="subtitle1">Do you want to remove this sport?</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" size="small" onClick={toogleOpen}>
              Close
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                // dispatch(deleteSportCenter(idToDelete));
                toogleOpen();
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default SportFieldCard;

SportFieldCard.propTypes = {
  sportField: PropTypes.object,
};
