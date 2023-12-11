// import DatePicker from "react-multi-date-picker";
import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../components/ButtonWhite/ButtonWhite";
import ActionAdmin from "../../../redux/Action";
import { useEffect, useState } from "react";
import { setValidate } from "../../../redux/Reducer";

const CreateModal = ({setDisabled, disabled}) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const levelAdmin = useSelector((state) => state.reducer.levelAdmin);
  const generateAdminId = useSelector((state) => state.reducer.generateAdminId);
  const roleAdmin = useSelector((state) => state.reducer.roleAdmin);
  const addForm = useSelector((state) => state.reducer.addForm);
  const validate = useSelector((state) => state.reducer.validate);
  const errorAddForm = useSelector((state) => state.reducer.errorAddForm);
  
  
  useEffect(() => {
    ActionAdmin.getLevelAdmin(dispatch);
    ActionAdmin.generateAdminId(dispatch);
  }, []);

  // useEffect(() => {
  //   // if(validate === true) {
  //   //   ActionAdmin.validate(dispatch, addForm)
  //   // } else if(validate === false) {
  //   //   ActionAdmin.validate(dispatch, addForm)
  //   // }
  //   ActionAdmin.validate(dispatch, addForm)
  // }, [addForm])

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-primary rounded-xl shadow-lg">
            <div className="m-3 text-left">
              <h3 className="text-green-primary font-bold">
                {t("management.create_admin")}
              </h3>
              <div className="mt-5">
                <div className="flex flex-row items-center gap-x-4 py-3">
                  <div className="w-32">
                    <label htmlFor="admin_name" className="font-bold">
                      {t("management.admin_name")}
                    </label>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="admin_name"
                      name="name"
                      placeholder={t("management.input_admin_nama")}
                      className={`rounded-xl border-0 w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                        errorAddForm.name ? "border-red-500 border-1" : "border-0"
                      }`}
                      onChange={(e) => {
                        ActionAdmin.handleChange(dispatch, e, addForm);
                      }}
                    />
                      <p className="text-red-500">{errorAddForm.name}</p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-x-4 py-3">
                  <div className="w-32">
                    <label htmlFor="level" className="font-bold">
                      {t("management.level")}
                    </label>
                  </div>
                  <div className="flex-1">
                    <select
                      className={`text-sm border border-gray-primary rounded-xl w-full bg-white font-bold ${
                        errorAddForm.level ? "border-red-500 border-1" : "border-0"
                      }`}
                      
                      id="level"
                      name="level"
                      onChange={(e) => {
                        ActionAdmin.getRoleAdmin(dispatch, e.target.value);
                        ActionAdmin.handleChange(dispatch, e, addForm);
                      }}
                    >
                      <option value="">{t("management.select_level")}</option>
                      {levelAdmin.map((item, index) => (
                        <option value={item.code} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500">{errorAddForm.level}</p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-x-4 py-3">
                  <div className="w-32">
                    <label htmlFor="role" className="font-bold">
                      {t("management.role")}
                    </label>
                  </div>
                  <div className="flex-1">
                    <select
                      className={`text-sm border border-gray-primary rounded-xl w-full bg-white font-bold ${
                        errorAddForm.roleId ? "border-red-500 border-1" : "border-0"
                      }`}
                      id="role"
                      name="roleId"
                      onChange={(e) => {
                        ActionAdmin.handleChange(dispatch, e, addForm);
                      }}
                    >
                      <option value="select">
                        {t("management.select_role")}
                      </option>
                      {roleAdmin &&
                        roleAdmin.map((item, index) => (
                          <option value={item.roleId} key={index}>
                            {item.roleName}
                          </option>
                        ))}
                    </select>
                    <p className="text-red-500">{errorAddForm.roleId}</p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-x-4 py-3">
                  <div className="w-32">
                    <label htmlFor="admin_id" className="font-bold">
                      {t("management.admin_id")}
                    </label>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="admin_id"
                      name="adminId"
                      placeholder={t("management.input_admin_id")}
                      className="rounded-xl border-0 w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium"
                      value={generateAdminId}
                      onChange={(e) => {
                        //ActionAdmin.generateAdminId(dispatch)
                        // ActionAdmin.handleChange(dispatch, e, addForm)
                      }}
                      readOnly
                    ></input>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-x-4 py-3">
                  <div className="w-32">
                    <label htmlFor="admin_name" className="font-bold">
                      {t("management.email")}
                    </label>
                  </div>
                  <div className="flex-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t("management.input_email")}
                      className={`rounded-xl border-0 w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                        errorAddForm.email ? "border-red 500 border-1" : "border-0"
                      }`}
                      onChange={(e) => {
                        ActionAdmin.handleChange(dispatch, e, addForm);
                      }}
                    />
                    <p className="text-red-500">{errorAddForm.email}</p>
                  </div>
                </div>

                <div className=" text-gold-secondary text-sm">
                  The password will be auto generated and will be sent to the
                  registered email address.
                </div>
              </div>
              <div className="items-center gap-2 mt-5 flex justify-end ">
                <ButtonWhite
                  title={t("general.cancel")}
                  // onClick={() => {
                  //   Action.changeShowModalAdmin(dispatch, { showModal: false });
                  // }}
                  onClick={() => {
                    ActionAdmin.changeShowModalAdmin(dispatch, {
                      showModal: false,
                    });
                  }}
                />
                
                <ButtonGreen
                  title={t("general.submit")}
                  onClick={() => {
                    //ActionAdmin.changeShowModalAdmin(dispatch, { showModal: false });
                    dispatch(setDisabled(false))
                    ActionAdmin.handleSubmit(
                      dispatch,
                      generateAdminId,
                      addForm,
                      setDisabled,
                      disabled
                    );
                    
                    // setDisabled(true)
                  }}
                  disabled={disabled}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateModal;
