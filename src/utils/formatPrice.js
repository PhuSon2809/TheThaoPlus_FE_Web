function formatCurrency(amount = 0) {
  // Sử dụng hàm toLocaleString() để định dạng số tiền thành chuỗi
  var formattedAmount = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  return formattedAmount;
}

export default formatCurrency;
