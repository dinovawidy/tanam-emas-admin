function MerchantBuybackModel({
  dateCreated,
  id,
  titcketId,
  totalWeight,
  quantity,
  totalPrice,
}) {
  let obj = {};
  obj.dateCreated = dateCreated;
  obj.id = id;
  obj.titcketId = titcketId;
  obj.totalWeight = totalWeight;
  obj.quantity = quantity;
  obj.totalPrice = totalPrice;
  return obj;
}

export default MerchantBuybackModel;
