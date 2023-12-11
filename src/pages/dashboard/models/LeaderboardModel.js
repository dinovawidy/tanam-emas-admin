function LeaderboardModel({ id, name, totalSales, salesPersentage, totalEarning, earningPersentage }) {
  let obj = {};
  obj.id = id;
  obj.name = name;
  obj.totalSales = totalSales;
  obj.salesPersentage = salesPersentage;
  obj.totalEarning = totalEarning;
  obj.earningPersentage = earningPersentage;
  return obj;
}

export default LeaderboardModel;