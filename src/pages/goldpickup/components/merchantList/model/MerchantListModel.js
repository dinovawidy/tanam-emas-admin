function MerchantListModel({
  id,
  name,
  location,
  address,
  quantity,
  totalWeight,
}) {
  let obj = {};
  obj.id = id;
  obj.name = name;
  obj.location = location;
  obj.address = address;
  obj.quantity = quantity;
  obj.totalWeight = totalWeight;
  return obj;
}

export default MerchantListModel;
