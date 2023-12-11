import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../components/ButtonWhite/ButtonWhite";
import Action from "../redux/Action";
import { useEffect } from "react";

const EditModal = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const addForm = useSelector((state) => state.reducer.addForm);
  const detailAdmin = useSelector((state) => state.reducer.detailAdmin);
  const levelAdmin = useSelector((state) => state.reducer.levelAdmin);
  const roleAdmin = useSelector((state) => state.reducer.roleAdmin);
  const errorAddForm = useSelector((state) => state.reducer.errorAddForm)

  useEffect(() => {
    Action.getLevelAdmin(dispatch);
    Action.validate(dispatch, addForm, detailAdmin);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => {
            Action.changeModalEdit(dispatch, { showModal: false });
          }}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-primary rounded-xl shadow-lg">
            <div className="m-3 text-left">
              <h3 className="text-green-primary font-bold">
                {t("management.edit_admin")}
              </h3>
              <div className="mt-5">
                <label
                  name="id"
                  onChange={(e) => {
                    Action.handleChange(dispatch, e, addForm);
                  }}
                  readOnly
                  hidden
                >
                  {detailAdmin.id}
                </label>
                <div className="flex flex-row items-center gap-x-4 py-3">
                  <div className="w-32">
                    <label htmlFor="admin_name" className="font-bold">
                      {t("management.admin_name")}
                    </label>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      //id="admin_name"
                      name="name"
                      placeholder={t("management.input_admin_name")}
                      className= {`rounded-xl border-0 w-full text-sm text-green-secondary bg-white ${
                        errorAddForm.name ? "border-red-500 border-1" : "border-0"
                      }`}
                      defaultValue={detailAdmin.name}
                      onChange={(e) => {
                        Action.handleChange(dispatch, e, addForm);
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
                      className="text-sm border border-gray-primary rounded-xl w-full bg-white text-green-secondary"
                      id="level"
                      name="level"
                      defaultValue={detailAdmin.levelName}
                      // defaultValue={detailAdmin.levelName}
                      onChange={(e) => {
                        Action.getRoleAdmin(dispatch, e.target.value);
                        Action.handleChange(dispatch, e, addForm);
                      }}
                    >
                      <option value="">{detailAdmin.levelName}</option>
                      {/* {levelAdmin
                        .filter((item) => item.name !== detailAdmin.levelName) // Filter out the duplicate item
                        .map((item, index) => (
                          <option value={item.code} key={index}>
                            {item.name}
                          </option>
                        ))} */}

                      {levelAdmin.map((item, index) => (
                        <option value={item.code} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
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
                      className="text-sm border border-gray-primary rounded-xl w-full bg-white text-green-secondary"
                      id="role"
                      name="roleId"
                      defaultValue={detailAdmin.roleName}
                      onChange={(e) => {
                        Action.handleChange(dispatch, e, addForm);
                      }}
                    >
                      <option value="">{detailAdmin.roleName}</option>
                      {roleAdmin &&
                        roleAdmin.map((item, index) => (
                          <option value={item.roleId} key={index}>
                            {item.roleName}
                          </option>
                        ))}
                    </select>
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
                      className=" rounded-xl border-0 w-full text-sm text-green-secondary bg-white"
                      defaultValue={detailAdmin.adminId}
                      readOnly
                    />
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
                      className= {`rounded-xl border-0 w-full text-sm text-green-secondary bg-white ${
                        errorAddForm.email ? "border-red-500 border-1" : "border-0"
                      }`}
                      defaultValue={detailAdmin.email}
                      onChange={(e) => {
                        Action.handleChange(dispatch, e, addForm);
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
              <div className="items-center gap-2 mt-3 flex justify-end">
                <ButtonWhite
                  title={t("general.cancel")}
                  onClick={() => {
                    Action.changeModalEdit(dispatch, { showModal: false });
                  }}
                />
                <ButtonGreen
                  title={t("general.submit")}
                  onClick={() => {
                    Action.handleSubmit(dispatch, detailAdmin, addForm);
                    // MainAction.getPage(mainStore, { page: "merchantList" });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
