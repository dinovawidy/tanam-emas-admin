function BalanceListModel({
    id,
    invoiceNumber,
    dateTime,
    commission,
    applicationServiceFee,
    cancellationFee,
    withdrawalStatus,
    withdrawalAmount,
    withdrawalFee,
    type,
    total,
    merchantId,
    merchantName,
    noResi,
    shippingCost,
    shippingInsurance,
  }) {
    let obj = {};
    obj.id = id;
    obj.invoiceNumber = invoiceNumber;
    obj.dateTime = dateTime;
    obj.commission = commission;
    obj.applicationServiceFee = applicationServiceFee;
    obj.cancellationFee = cancellationFee;
    obj.withdrawalStatus = withdrawalStatus;
    obj.withdrawalAmount = withdrawalAmount;
    obj.withdrawalFee = withdrawalFee;
    obj.type = type;
    obj.total = total;
    obj.merchantId = merchantId;
    obj.merchantName = merchantName;
    obj.noResi = noResi;
    obj.shippingCost = shippingCost;
    obj.shippingInsurance = shippingInsurance;
    return obj;
  }
  
  export default BalanceListModel;
  