function AddressModel({ value, label, code, image, name }) {
    let obj = {};
    obj.value = value;
    obj.label = label;
    obj.code = code;
    obj.image = image;
    obj.name = name;
    return obj;
  }
  
  export default AddressModel;
  