function ReqMerchantModel({
  id,
  merchantName,
  merchantPhoto,
  email,
  phoneNumber,
  countryDialCode,
  address,
  bankName,
  bankNumber,
  nik,
  npwp,
  nib,
  city,
  province,
  npwpFile,
  ktpFile,
  status,
  buyback,
  reqDate,
  districts,
  countryCode_id,
  countryCode_name,
  countryCode_dialCode,
  countryCode_code,
  countryCode_image,
  provinces_id,
  provinces_name,
  cities_id,
  cities_name,
  districts_id,
  districts_name,
  districts_alias,
  postalCode,
  remarks,
}) {
  let obj = {};
  obj.id = id;
  obj.merchantName = merchantName;
  obj.merchantPhoto = merchantPhoto;
  obj.email = email;
  obj.phoneNumber = phoneNumber;
  obj.countryDialCode = countryDialCode;
  obj.address = address;
  obj.bankName = bankName;
  obj.bankNumber = bankNumber;
  obj.nik = nik;
  obj.npwp = npwp;
  obj.nib = nib;
  obj.city = city;
  obj.province = province;
  obj.npwpFile = npwpFile;
  obj.ktpFile = ktpFile;
  obj.status = status;
  obj.buyback = buyback;
  obj.reqDate = reqDate;
  obj.districts = districts;
  obj.countryCode_id =countryCode_id;
  obj.countryCode_name =  countryCode_name;
  obj.countryCode_dialCode =  countryCode_dialCode;
  obj.countryCode_code =  countryCode_code;
  obj.countryCode_image =  countryCode_image;
  obj.provinces_id = provinces_id;
  obj.provinces_name = provinces_name;
  obj.cities_id = cities_id;
  obj.cities_name = cities_name;
  obj.districts_id = districts_id;
  obj.districts_name = districts_name;
  obj.districts_alias = districts_alias;
  obj.postalCode = postalCode;
  obj.remarks = remarks;
  return obj;
}

export default ReqMerchantModel;
