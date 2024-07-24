export function formatCurrency(value) {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  }
  
  export function calculateDiscount(price, discountRate) {
    // Your discount calculation logic
  }