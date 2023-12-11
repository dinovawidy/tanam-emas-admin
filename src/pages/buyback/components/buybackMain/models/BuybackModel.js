function BuybackModel({
  id,
  ticket_id,
  date_created,
  customer_name,
  weight,
  total_price,
  status,
  category,
}) {
  let obj = {};
  obj.id = id;
  obj.ticket_id = ticket_id;
  obj.date_created = date_created;
  obj.customer_name = customer_name;
  obj.weight = weight;
  obj.total_price = total_price;
  obj.status = status;
  obj.category = category;
  return obj;
}

export default BuybackModel;
