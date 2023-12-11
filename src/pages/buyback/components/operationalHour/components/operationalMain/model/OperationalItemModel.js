function OperationalItemModel({
  id,
  dayOfWeek,
  startTime,
  endTime,
  status,
}) {
  let obj = {};
  obj.id = id;
  obj.dayOfWeek = dayOfWeek;
  obj.startTime = startTime;
  obj.endTime = endTime;
  obj.status = status;
  return obj;
};

export default OperationalItemModel;
