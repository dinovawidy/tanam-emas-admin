function RevenueModel({
  product_sales,
  revenue_this_period,
  revenue_last_period,
  presentage,
  this_period_price,
  this_period_date,
  last_period_price,
  last_period_date,
}) {
  let obj = {};
  obj.product_sales = product_sales;
  obj.revenue_this_period = revenue_this_period;
  obj.revenue_last_period = revenue_last_period;
  obj.presentage = presentage;
  obj.this_period_price = this_period_price;
  obj.this_period_date = this_period_date;
  obj.last_period_price = last_period_price;
  obj.last_period_date = last_period_date;

  return obj;
}

export default RevenueModel;
