import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../components/ButtonWhite/ButtonWhite";
import Action from "../redux/Action";
import EditModal from "./EditModal";
import ConfirmationModal from "../../../../../components/ConfirmationModal/ConfirmationModal";
import UseAuth from "../../../../auth/Auth";

const Detail = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const modalEdit = useSelector((state) => state.reducer.modalEdit);
  const modalTerminate = useSelector((state) => state.reducer.modalTerminate);
  const modalDeactive = useSelector((state) => state.reducer.modalDeactive);
  const modalActive = useSelector((state) => state.reducer.modalActive);
  const detailAdmin = useSelector((state) => state.reducer.detailAdmin);

  const enumStatus = Object.freeze({
    "-1": t("management.terminated"),
    0: t("management.inactive"),
    1: t("management.active"),
  });


  return (
    <div className="font-medium text-sm">
      <div className="flex flex-row items-center pb-4">
        <h4 className="flex-1 opacity-60 font-bold">
          {t("management.details").toUpperCase()}
        </h4>
        {/* {UseAuth.checkFunction("edit-admin-management-button", "button") ===
        true ? ( */}
        {detailAdmin.updatePermission === true ? (
          <a
            className="cursor-pointer"
            onClick={() => {
              Action.changeModalEdit(dispatch, { showModal: true });
            }}
          >
            <img
              src={process.env.REACT_APP_ASSETS_IMAGE + "edit-icon.svg"}
              alt="edit-icon"
            />
          </a>
        ) : (
          ""
        )}
      </div>

      <div className="h-72 overflow-y-auto">
        <div className="flex flex-row items-center pb-2">
          <div className="flex-1">
            <p className="text-green-quaternary">{t("management.admin_id")}</p>
            <p className="font-bold text-md">{detailAdmin.adminId}</p>
          </div>
          <div className="text-right">
            <div className="px-4 py-1 text-green-primary font-bold rounded-xl border-2 border-green-secondary border-opacity-40">
              {enumStatus[detailAdmin.status]}
            </div>
          </div>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.name")}</p>
          <p className="font-bold text-md">{detailAdmin.name}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.level")}</p>
          <p className="font-bold text-md">{detailAdmin.levelName}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.role")}</p>
          <p className="font-bold text-md">{detailAdmin.roleName}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.email")}</p>
          <p className="font-bold text-md">{detailAdmin.email}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.phone_no")}</p>
          <p className="font-bold text-md">{detailAdmin.phoneNumber}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">
            {t("management.account_created")}
          </p>
          <p className="font-bold text-md">{detailAdmin.createdAt}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">
            {t("management.last_activity")}
          </p>
          <p className="font-bold text-md">{detailAdmin.lastActivity}</p>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-x-2">
        {detailAdmin.updatePermission === true && detailAdmin.status === 1 || (detailAdmin.status === 0 && detailAdmin.updatePermission === true &&
          UseAuth.checkFunction(
            "terminate-admin-management-button",
            "button"
          ) === true) ? (
          <ButtonGreen
            title={t("management.terminate")}
            onClick={() => {
              Action.changeModalTerminate(dispatch, { showModal: true });
            }}
          />
        ) : (
          ""
        )}

        {detailAdmin.status === 1 &&
        UseAuth.checkFunction("deactive-admin-management-button", "button") ===
          true ? (
          <ButtonWhite
            title={t("management.deactivate")}
            onClick={() => {
              Action.changeModalDeactive(dispatch, { showModal: true });
            }}
          />
        ) : (
          ""
        )}

        {detailAdmin.status === 0 
        // &&
        // UseAuth.checkFunction("active-admin-management-button", "button") ===
        //   true 
          ? (
          <ButtonWhite
            title={t("management.active")}
            onClick={() => {
              Action.changeModalActive(dispatch, { showModal: true });
            }}
          />
        ) : (
          ""
        )}
      </div>

      {modalEdit ? <EditModal /> : null}
      {modalTerminate ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalTerminate(dispatch, { showModal: showModal });
          }}
          title={t("management.confirm_terminate")}
          subtitle={t("management.subtitle_terminate")}
          onClick={({ remark, identifier }) => {
            Action.handleSubmitTerminate(dispatch, {
              remarks: remark,
              id: detailAdmin.id,
              identifier: identifier,
            });
          }}
        />
      ) : null}
      {modalDeactive ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalDeactive(dispatch, { showModal: showModal });
          }}
          title={t("management.confirm_deactivation")}
          subtitle={t("management.subtitle_deactivation")}
          onClick={({ remarks, identifier }) => {
            Action.handleSubmitDeactivate(dispatch, {
              id: detailAdmin.id,
              remarks: remarks,
              identifier: identifier,
            });
          }}
        />
      ) : null}

      {modalActive ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalActive(dispatch, { showModal: showModal });
          }}
          title={t("management.confirm_activation")}
          subtitle={t("management.subtitle_activation")}
          onClick={({ remarks, identifier }) => {
            Action.handleSubmitActivate(dispatch, {
              id: detailAdmin.id,
              remarks: remarks,
              identifier: identifier,
            });
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Detail;
