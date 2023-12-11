function BalanceModel({
    bankName,
    price,
    accountNumber,
    accountName,
    balance,
    withdrawalFee,
    total,
  }) {
    let obj = {};
    obj.bankName = bankName;
    obj.price = price;
    obj.accountNumber = accountNumber;
    obj.accountName = accountName;
    obj.balance = balance;
    obj.withdrawalFee = withdrawalFee;
    obj.total = total;
    return obj;
  }
  
  export default BalanceModel;
  