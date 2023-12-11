function MerchantModel({ id, merchantId, name, location, status, buyback, rating }) {
  let obj = {};
  obj.id = id;
  obj.merchantId = merchantId;
  obj.name = name;
  obj.location = location;
  obj.status = status;
  obj.buyback = buyback;
  obj.rating = rating;
  return obj;
}

export default MerchantModel;
