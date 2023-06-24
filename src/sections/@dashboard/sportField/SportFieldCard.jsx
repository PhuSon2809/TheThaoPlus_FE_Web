import { Box, Card, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useModal } from 'src/hooks/useModal';
import formatCurrency from 'src/utils/formatPrice';
import Label from '../../../components/label';
import SportFieldDetail from './SportFieldDetail';

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
  const { name, images, price, status, fieldType } = sportField;

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
            {status === false ? 'Không hoạt động' : 'Hoạt động'}
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
            <Typography variant="subtitle1">{formatCurrency(price)}/1 giờ</Typography>
          </Stack>
        </Stack>
      </Card>

      {isOpenDetail && (
        <SportFieldDetail isOpenDetail={isOpenDetail} toogleOpenDetail={toogleOpenDetail} sportField={sportField} />
      )}
    </>
  );
}

export default SportFieldCard;

SportFieldCard.propTypes = {
  sportField: PropTypes.object,
};
