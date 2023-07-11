import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from '@mui/material';

function UpdatePassword({ isOpenPassword, toogleOpenPassword }) {
  return (
    <>
      {isOpenPassword && (
        <Dialog maxWidth="md" fullWidth open={isOpenPassword} onClose={toogleOpenPassword}>
          <DialogContent sx={{ height: 700 }}>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
              <Typography variant="h4">Thay đổi mật khẩu</Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" size="medium" onClick={toogleOpenPassword}>
              Đóng
            </Button>
            <Button variant="contained" color="primary" size="medium" onClick={toogleOpenPassword}>
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default UpdatePassword;
