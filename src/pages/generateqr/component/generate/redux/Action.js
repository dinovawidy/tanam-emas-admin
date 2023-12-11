import Swal from "sweetalert2";
import QRCodeRepository from "../../../../../repositories/QRCodeRepository";
import DateUtility from "../../../../../utils/date-utility";
import DocsUtility from "../../../../../utils/docs-utility";
import PopupUtility from "../../../../../utils/popup-utility";

const addList = async (value, list, setList) => {
  const item = { ...value };
  item.id = list.length + 1;
  setList([...list, item]);
};

const sortList = async (
  fieldName,
  orderBy,
  list,
  setList,
  setFieldName,
  setOrderBy
) => {
  let sortedList;
  if (fieldName === "quantity") {
    if (orderBy === "asc") {
      sortedList = [...list].sort((a, b) => a.quantity - b.quantity);
    } else {
      sortedList = [...list].sort((a, b) => b.quantity - a.quantity);
    }
  } else if (fieldName === "brandName") {
    if (orderBy === "asc") {
      sortedList = [...list].sort((a, b) =>
        a.brandName.localeCompare(b.brandName)
      );
    } else {
      sortedList = [...list].sort((a, b) =>
        b.brandName.localeCompare(a.brandName)
      );
    }
  }
  setFieldName(fieldName);
  setOrderBy(orderBy);
  setList(sortedList);
};

const delItem = async (id, list, setList) => {
  setList(list.filter((list) => list.id !== id));
};

const getTotalProduct = async (value, totalProduct, setTotalProduct) => {
  setTotalProduct(totalProduct + value);
};

const getTotalQuantity = async (value, totalQuantity, setTotalQuantity) => {
  setTotalQuantity(totalQuantity + value);
};

const getWeight = async (setWeight) => {
  let response = await QRCodeRepository.getGram();
  if (!response.error) {
    setWeight(response.data.data);
  }
};

const handleChange = async (e, form, setForm) => {
  const { name, value } = e.target;
  if (name === "gramId") {
    const firstWord = value.split(" ")[0];
    const secondWord = value.split(" ")[1];
    setForm({ ...form, gramId: firstWord, gramName: secondWord });
  } else {
    setForm({ ...form, [name]: value, fineness: 999.9 });
  }
};

const onSubmit = async (form, setForm, setError, onCancel, addList) => {
  const isValid = validate(form, setError);
  if (Object.keys(isValid).length === 0) {
    onCancel(false);
    setForm({ productPhoto1: "", productPhoto2: "" });
    addList(form);
    setError({});
  }
};

const validate = (values, setError) => {
  const errors = {};
  if (!values.brandName) {
    errors.brandName = "Brand Name is required!";
  }

  if (!values.serialNumber) {
    errors.serialNumber =
      "Serial Number must be filled in at least 1 - 2 letters!!";
  }

  if (!values.namePhoto1 && !values.namePhoto2) {
    errors.productPhoto = "Product Photo is required!";
  }

  if (!values.gramId) {
    errors.gramId = "Weight of gold is required!";
  }

  if (!values.quantity) {
    errors.quantity = "Quantity is required!";
  } else if (parseInt(values.quantity) === 0) {
    errors.quantity = "Quantity cannot be zero!";
  }

  setError(errors);
  return errors;
};

const exportData = async (list, getPage) => {
  if (list.length > 0) {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    let response = await QRCodeRepository.createNew(list);
    let dateNow = new Date();
    let nameFile = "QRCode-" + DateUtility.dateFormatApi(dateNow);
    if (!response.error) {
      Swal.close();
      DocsUtility.generateDocs(response.data.data, nameFile);
      getPage("main");
      PopupUtility.success("The QRCode has been successfully generated.");
    } else {
      Swal.close();
      PopupUtility.responseValidate("Failed", response.message);
    }
  } else {
    PopupUtility.responseValidate("Failed", "Data cannot be empty");
  }
};

const Action = {
  addList,
  delItem,
  getTotalProduct,
  getTotalQuantity,
  getWeight,
  handleChange,
  validate,
  onSubmit,
  sortList,
  exportData,
};

export default Action;
