function CustomerModel({ id, name, email, status }) {
  let obj = {};
  obj.id = id;
  obj.name = name;
  obj.email = email;
  obj.status = status;
  return obj;
}

export default CustomerModel;
