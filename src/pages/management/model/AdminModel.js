function AdminModel({ id, adminId, name, level, role, status }) {
  let obj = {};
  obj.id = id;
  obj.adminId = adminId;
  obj.name = name;
  obj.level = level;
  obj.role = role;
  obj.status = status;
  return obj;
}

export default AdminModel;
