function NotificationModel({ id, adminName, title, subtitle}) {
  let obj = {};
  obj.id = id;
  obj.adminName = adminName;
  obj.title = title;
  obj.subtitle = subtitle;
  return obj;
}

export default NotificationModel;