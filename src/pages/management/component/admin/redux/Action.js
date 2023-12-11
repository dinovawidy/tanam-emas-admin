import ManagementAdminRepository from "../../../../../repositories/ManagementAdminRepository";
import PopupUtility from "../../../../../utils/popup-utility";
import {
  setCurrentPage,
  setList,
  setLoading,
  setPostPerPage,
  setShowDetail,
  setTotalData,
  setTotalPage,
  setModalEdit,
  setModalTerminate,
  setModalDeactive,
  setModalActive,
  setDetailAdmin,
  setStatusFilter,
  setFieldName,
  setOrderBy,
  setSearch,
  setShowModalAdmin,
  setLevelAdmin,
  setRoleAdmin,
  setAddForm,
  setErrorAddForm,
  setValidate,
  setDisabled,
} from "./Reducer";

const getList = async (
  dispatch,
  { currentPage, search, statusFilter, postPerPage, fieldName, orderBy }
) => {
  dispatch(setLoading(true));
  dispatch(setCurrentPage(currentPage));
  dispatch(setSearch(search));
  dispatch(setStatusFilter(statusFilter));
  dispatch(setPostPerPage(postPerPage));
  dispatch(setFieldName(fieldName));
  dispatch(setOrderBy(orderBy));

  let data = {
    page: currentPage,
  };

  if (search) {
    data.search = search;
  } else {
    data.search = "";
  }

  if (statusFilter) {
    data.status = statusFilter;
  } else {
    data.status = "";
  }

  if (postPerPage) {
    data.size = postPerPage;
  } else {
    data.size = 5;
  }

  if (orderBy) {
    data.orderBy = orderBy;
  } else {
    data.orderBy = "";
  }

  if (fieldName) {
    data.fieldName = fieldName;
  } else {
    data.fieldName = "";
  }

  let response = await ManagementAdminRepository.getAdmin(data);

  if (response.error === false) {
    dispatch(setLoading(false));
    dispatch(setList(response.data));
    dispatch(setTotalData(response.total_data));
    dispatch(setTotalPage(response.total_pages));
  } else {
    dispatch(setLoading(true));
    dispatch(setList([]));
    dispatch(setTotalData(0));
    dispatch(setTotalPage(0));
  }
};

const setPage = async (dispatch, pages) => {
  dispatch(setCurrentPage(pages));
  getList(dispatch, { page: pages });
};

const changeShowModalAdmin = async (dispatch, { showModal }) => {
  dispatch(setShowModalAdmin(showModal));
};

const changeShowDetail = async (dispatch, showDetail, id) => {
  if (id) {
    var response = await ManagementAdminRepository.detailAdmin({ id: id });
    const resDetail = response.data.data;

    if (response.error === false) {
      dispatch(setDetailAdmin(resDetail));
    } else {
      dispatch(setDetailAdmin({}));
    }
  } else {
    dispatch(setDetailAdmin({}));
  }
  dispatch(setShowDetail(showDetail));
};

const handleChange = (dispatch, e, addForm) => {
  const { name, value } = e.target;
  dispatch(setAddForm({ ...addForm, [name]: value }));
};

const getLevelAdmin = async (dispatch) => {
  const level = await ManagementAdminRepository.getLevelAdmin();
  dispatch(setLevelAdmin(level));
};

const getRoleAdmin = async (dispatch, code) => {
  const role = await ManagementAdminRepository.getRoleAdmin({ code: code });
  dispatch(setRoleAdmin(role));
};

const changeModalEdit = async (dispatch, { showModal }) => {
  dispatch(setModalEdit(showModal));
};

const changeModalTerminate = async (dispatch, { showModal }) => {
  dispatch(setModalTerminate(showModal));
};

const changeModalDeactive = async (dispatch, { showModal }) => {
  dispatch(setModalDeactive(showModal));
};

const changeModalActive = async (dispatch, { showModal }) => {
  dispatch(setModalActive(showModal));
};

const handleSubmitDeactivate = async (dispatch, { id, remarks }) => {
  let response = await ManagementAdminRepository.changeStatusAdmin({
    id: id,
    remarks: remarks,
    identifier: "deactive-admin-management-button",
  });
  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalDeactive(""));
  } else {
    PopupUtility.responseValidate("Failed", response.message);
  }
};

const handleSubmitActivate = async (dispatch, { id, remarks }) => {
  let data = {
    id: id,
    remarks: remarks,
    identifier: "active-admin-management-button",
  };

  let response = await ManagementAdminRepository.changeStatusAdmin(data);

  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalActive(""));
  } else {
    PopupUtility.responseValidate("Failed", response.message);
  }
};

const handleSubmitTerminate = async (dispatch, { id, remarks }) => {
  let data = {
    id: id,
    remarks: remarks,
    identifier: "terminate-admin-management-button",
  };

  let response = await ManagementAdminRepository.changeStatusAdmin(data);

  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalActive(""));
  } else {
    PopupUtility.responseValidate("Failed", response.message);
  }
};

const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

const validate = (dispatch, values, detailAdmin) => {
  const errors = {};
  if (!values.name && !detailAdmin.name || values.name === "") {
    errors.name = "Name is required";
  }
  if (!values.level && !detailAdmin.levelCode) {
    errors.level = "Select Level";
  }
  if (!values.roleId && !detailAdmin.roleId) {
    errors.roleId = "Select Role";
  }
  if (!values.email && !detailAdmin.email || values.email === "") {
    errors.email = "Email is required";
  }
  if (values.email && !validateEmail(values.email)) {
    errors.email = "Email is invalid";
  }

  dispatch(setErrorAddForm(errors));
  return errors;
};

const handleSubmit = async (dispatch, detailAdmin, addForm) => {
  dispatch(setValidate(true));
  const isValid = Action.validate(dispatch, addForm, detailAdmin);

  if (Object.keys(isValid).length === 0) {
    const data = {};
    
    data.id = detailAdmin.id;
    if(addForm.name !== "" || detailAdmin.name !== "") {
      data.name = addForm.name || detailAdmin.name;
    } else {
      data.name = "";
    }
    // data.name = addForm.name || detailAdmin.name;
    if(addForm.level !== "" || detailAdmin.levelCode !== "") {
      data.level = addForm.level || detailAdmin.levelCode;
    } else {
      data.level = "";
    }
    // data.level = addForm.level || detailAdmin.levelCode;
    if(addForm.roleId !== "" || detailAdmin.roleId !== "") {
      data.roleId = addForm.roleId || detailAdmin.roleId;
    } else {
      data.roleId = "";
    }
    // data.roleId = addForm.roleId || detailAdmin.roleId;
    data.adminId = detailAdmin.adminId;

    if(addForm.email !== "" || detailAdmin.email !== "") {
      data.email = addForm.email || "";
    } else {
      data.email = "";
    }

    // data.email = addForm.email || detailAdmin.email;
    const response = await ManagementAdminRepository.editAdmin(data);
    if (response.error === false) {
      PopupUtility.success("Admin Has Updated");
      getList(dispatch, { currentPage: 0, postPerPage: 5 });
      Action.changeModalEdit(dispatch, { showModal: false });
    } else {
      PopupUtility.responseValidate("Failed", response.message);
    }
  }
};

const Action = {
  getList,
  setPage,
  changeShowDetail,
  changeModalEdit,
  changeModalTerminate,
  changeModalDeactive,
  changeModalActive,
  handleSubmitTerminate,
  handleSubmitDeactivate,
  handleSubmitActivate,
  changeShowModalAdmin,
  getLevelAdmin,
  getRoleAdmin,
  handleChange,
  handleSubmit,
  validate,
  // generateAdminId,
};

export default Action;
