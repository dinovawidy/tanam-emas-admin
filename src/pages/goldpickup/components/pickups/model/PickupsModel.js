function PickupsModel({
  pickupDate,
  id,
  ticketId,
  name,
  quantity,
  weight,
  pickupMethod,
  status,
}) {
  let obj = {};
  obj.pickupDate = pickupDate;
  obj.id = id;
  obj.ticketId = ticketId;
  obj.name = name;
  obj.quantity = quantity;
  obj.weight = weight;
  obj.pickupMethod = pickupMethod;
  obj.status = status;
  return obj;
}

export default PickupsModel;
