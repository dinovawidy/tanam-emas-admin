function ProductModel({
  upload_date,
  id,
  name_jewelry,
  brand_name,
  weight,
  merchant_name,
  edition_name,
  sales_count,
  status,
  stock,
  price,
  promotion_price,
  fineness,
  photo,
  dimension,
  product_category,
  size,
  color,
  normal_price,
  subCategoryName,
}) {
  let obj = {};
  obj.id = id;
  obj.name_jewelry = name_jewelry;
  obj.edition_name = edition_name;
  obj.brand_name = brand_name;
  obj.weight = weight;
  obj.status = status;
  obj.merchant_name = merchant_name;
  obj.sales_count = sales_count;
  obj.upload_date = upload_date;
  obj.stock = stock;
  obj.price = price;
  obj.promotion_price = promotion_price;
  obj.fineness = fineness;
  obj.photo = photo;
  obj.dimension = dimension;
  obj.product_category = product_category;
  obj.size = size;
  obj.color = color;
  obj.normal_price = normal_price;
  obj.subCategoryName = subCategoryName;

  return obj;
}

export default ProductModel;
