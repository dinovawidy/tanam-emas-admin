function RemarksModel({ id, date, remark, type, writer }) {
  let obj = {};
  obj.id = id;
  obj.date = date;
  obj.remark = remark;
  obj.type = type;
  obj.writer = writer;
  return obj;
}

export default RemarksModel;
