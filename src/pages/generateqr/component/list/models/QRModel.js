function QRModel({ id, serialNumber, productName, fineness }) {
  let obj = {};
  obj.id = id;
  obj.serialNumber = serialNumber;
  obj.productName = productName;
  obj.fineness = fineness;
  return obj;
}

export default QRModel;
