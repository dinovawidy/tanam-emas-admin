function TopSellingModel({ id, product, merchant, salesCount, totalSales}) {
    let obj = {};
    obj.id = id;
    obj.product = product;
    obj.merchant = merchant;
    obj.salesCount = salesCount;
    obj.totalSales = totalSales;
    return obj;
}

export default TopSellingModel;