function InsightModel({id,data_selling,percentage,last_update}) {
    let obj = {};
    obj.id = id;
    obj.data_selling = data_selling;
    obj.percentage = percentage;
    obj.last_update = last_update;
    return obj;
  }
  
  export default InsightModel;