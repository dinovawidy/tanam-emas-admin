function BuybackDashboardModel({ transaction, transactionPersentage, goldWeight, goldWeightPersentage, goldPcs, goldPcsPersentage, }) {
  let obj = {};
  obj.transaction = transaction;
  obj.transactionPersentage = transactionPersentage;
  obj.goldWeight = goldWeight;
  obj.goldWeightPersentage = goldWeightPersentage;
  obj.goldPcs = goldPcs;
  obj.goldPcsPersentage = goldPcsPersentage;
  return obj;
}

export default BuybackDashboardModel;