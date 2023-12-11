function MerchantModel({ id, issuedDate, feedbackId, category, topic, status, statusName }) {
  let obj = {};
  obj.id = id;
  obj.issuedDate = issuedDate;
  obj.feedbackId = feedbackId;
  obj.category = category;
  obj.topic = topic;
  obj.status = status;
  obj.statusName = statusName; 
  return obj;
}

export default MerchantModel;
