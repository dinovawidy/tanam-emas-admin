function ChangeLogModel({ id, dateTime, buybackPrice, admin, }) {
  let obj = {};
  obj.id = id;
  obj.dateTime = dateTime;
  obj.buybackPrice = buybackPrice;
  obj.admin = admin;
  return obj;
}

export default ChangeLogModel;