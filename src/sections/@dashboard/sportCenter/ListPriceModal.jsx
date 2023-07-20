import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Button, Dialog, DialogActions, DialogContent, Divider, Stack, Typography } from '@mui/material';
import formatCurrency from 'src/utils/formatPrice';

const sportCenter = {
  priceOption: [
    {
      fieldType: '5x5',
      listPrice: [
        {
          timeStart: 0,
          timeEnd: 3,
          price: 300000,
        },
        {
          timeStart: 4,
          timeEnd: 6,
          price: 350000,
        },
      ],
    },
    {
      fieldType: '7x7',
      listPrice: [
        {
          timeStart: 0,
          timeEnd: 3,
          price: 400000,
        },
        {
          timeStart: 4,
          timeEnd: 6,
          price: 450000,
        },
      ],
    },
  ],
};

function ListPriceModal({ isOpen, toogleOpen }) {
  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={toogleOpen}>
          <DialogContent>
            <Stack direction="row" alignItems="center" gap={1}>
              <LocalOfferIcon fontSize="large" color="main" />
              <Typography variant="h4">Giá tiền các loại sân</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />
            <Stack width="100%" direction="row" alignItems="center" gap={2}>
              <Stack px={2} width={120} alignItems="center">
                <Typography variant="subtitle1">Loại sân</Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack px={2} flex={1} alignItems="center">
                <Typography variant="subtitle1">Ngày áp dụng</Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack px={2} width={120} alignItems="center">
                <Typography variant="subtitle1">Giá tiền</Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack width="100%" direction="column" alignItems="center" gap={2}>
              {sportCenter.priceOption.map((option, index) => (
                <Stack key={index} width="100%" direction="row" alignItems="center" gap={2}>
                  <Stack px={2} width={120} alignItems="center">
                    <Typography>{option.fieldType}</Typography>
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack px={2} flex={1} alignItems="center">
                    {option.listPrice.map((price, i) => (
                      <Stack key={i}>
                        <Typography>
                          {price.timeStart === 0
                            ? 'Thứ hai'
                            : price.timeStart === 1
                            ? 'Thứ ba'
                            : price.timeStart === 2
                            ? 'Thứ tư'
                            : price.timeStart === 3
                            ? 'Thứ năm'
                            : price.timeStart === 4
                            ? 'Thứ sáu'
                            : price.timeStart === 5
                            ? 'Thứ bảy'
                            : 'Chủ nhật'}{' '}
                          -{' '}
                          {price.timeEnd === 0
                            ? 'Thứ hai'
                            : price.timeEnd === 1
                            ? 'Thứ ba'
                            : price.timeEnd === 2
                            ? 'Thứ tư'
                            : price.timeEnd === 3
                            ? 'Thứ năm'
                            : price.timeEnd === 4
                            ? 'Thứ sáu'
                            : price.timeEnd === 5
                            ? 'Thứ bảy'
                            : 'Chủ nhật'}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack px={2} width={120} alignItems="center">
                    {option.listPrice.map((price, k) => (
                      <Stack key={k}>
                        <Typography>{formatCurrency(price.price)}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" size="small" onClick={toogleOpen}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ListPriceModal;
