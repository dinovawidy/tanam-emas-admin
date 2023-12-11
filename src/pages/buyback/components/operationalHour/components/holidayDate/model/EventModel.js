function EventModel({ id, eventName, startDate, endDate, status }) {
  let obj = {};
  obj.id = id;
  obj.eventName = eventName;
  obj.startDate = startDate;
  obj.endDate = endDate;
  obj.status = status
  return obj;
}

export default EventModel;