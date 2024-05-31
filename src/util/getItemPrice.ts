const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export const getItemPrice = (itemQuantity: number, price: number) => {
  return formatter.format(itemQuantity * (price / 100));
}