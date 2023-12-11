import React from "react";
import { setTranslations, useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ConfirmationModal from "../../../../../components/ConfirmationModal/ConfirmationModal";
import ModalImage from "../../../../../components/ModalImage/ModalImage";
import Action from "../redux/Action";
import UseAuth from "../../../../auth/Auth";
import { setModalTransaction, setRemark } from "../redux/Reducer";
import PopupTable from "./PopupTable";
import TransactionHistory from "./TransactionHistory";

const Detail = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.reducer.modal);
  const modalStatus = useSelector((state) => state.reducer.modalStatus);
  const itemDetail = useSelector((state) => state.reducer.itemDetail);
  const modalImage = useSelector((state) => state.reducer.modalImage);
  const modalTransaction = useSelector((state) => state.reducer.modalTransaction);
  const remark = useSelector((state) => state.reducer.remark);

  const enumStatus = Object.freeze({
    "-2": t("management.is_deleted"),
    "-1": t("management.suspended"),
    0: t("management.req_suspended"),
    1: t("management.active"),
  });

  return (
    <div className="font-medium text-sm">
      <div className="flex flex-row items-center pb-4">
        <h4 className="flex-1 opacity-60 font-bold">
          {t("management.details").toUpperCase()}
        </h4>
      </div>

      <div className="h-72 overflow-y-auto max-w-xs">
        <div className="flex flex-row pb-3">
          <div className="flex flex-row items-center flex-1">
            <div className="w-24">
              <img
                className="h-full w-full rounded-xl"
                src={itemDetail.customerPhoto}
                alt="customer"
              />
            </div>
            <div className="flex-1 pl-2">
              <p className="text-green-quaternary">
                {t("management.customer_id")}
              </p>
              <p className="font-bold text-md">{itemDetail.customerId}</p>

              <p className="text-green-quaternary pt-2">
                {t("management.customer_name")}
              </p>
              <p className="font-bold text-md">{itemDetail.customerName}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="min-w-fit py-1 px-3 text-center text-green-primary font-bold rounded-xl border-2 border-green-secondary border-opacity-40">
              {enumStatus[itemDetail.status]}
            </div>
          </div>
        </div>
        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.email")}</p>
          <p className="font-bold text-md">{itemDetail.email}</p>
        </div>
        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.phone_no")}</p>
          <p className="font-bold text-md">{itemDetail.phoneNumber}</p>
        </div>
        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.address")}</p>
          <p className="font-bold text-md">{itemDetail.address}</p>
        </div>
        <div className="pb-2 flex flex-row">
          <div className="flex-1">
            <p className="text-green-quaternary">{t("management.ba_name")}</p>
            <p className="font-bold text-md">{itemDetail.bankAccountName}</p>
          </div>
          <div>
            <p className="text-green-quaternary">{t("management.ba_number")}</p>
            <p className="font-bold text-md">{itemDetail.bankAccountNumber}</p>
          </div>
        </div>
        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.nik")}</p>
          <p className="font-bold text-md">{itemDetail.nik}</p>
        </div>

        {UseAuth.checkFunction(
          "uploaddoc-customer-management-button",
          "button"
        ) === true ? (
          <div className="pb-4">
            <p className="text-green-quaternary">
              {t("management.upload_doc")}
            </p>
            <div className="flex flex-row pt-1">
              <div className="flex flex-col justify-center text-center">
                <img
                  className="h-10 cursor-pointer"
                  src={process.env.REACT_APP_ASSETS_IMAGE + "file-icon.svg"}
                  alt="uploaded-icon"
                  onClick={() => {
                    Action.changeModalImage(dispatch, {
                      showModal: true,
                    });
                  }}
                />
                <p className="font-bold text-xs pt-1">ktp.jpg</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="pb-4">
          <p className="font-bold text-md text-gold-secondary cursor-pointer"
            onClick={() => {
              dispatch(setModalTransaction(true));
            }}>
            {t("management.transaction_history")}
          </p>
        </div>

        {itemDetail.remark.length > 0 && (
          <>
            <hr />
            <div className="pb-2 pt-4">
              <p className="text-green-quaternary">
                {t("management.suspended_by")}
              </p>
              <p className="font-bold text-md">{itemDetail.remark[0].writer}</p>
            </div>
            <div className="pb-2">
              <div className="flex justify-between">
                <p className="text-green-quaternary">
                  {t("management.remarks")}
                </p>
                <p
                  className=" text-gold-secondary hover:text-gold-primary cursor-pointer"
                  onClick={() => {
                    dispatch(setRemark(true));
                  }}
                >
                  {t("management.history")}
                </p>
              </div>
              <p className="font-bold text-md">{itemDetail.remark[0].remark}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-row-reverse gap-x-2">
        {itemDetail.status === 0 &&
          UseAuth.checkFunction(
            "suspened-customer-management-button",
            "button"
          ) === true ? (
          <ButtonGreen
            title={t("management.suspend")}
            onClick={() => {
              Action.changeModal(dispatch, "0", { showModal: true });
            }}
          />
        ) : (
          ""
        )}

        {itemDetail.status === 1 &&
          UseAuth.checkFunction(
            "reqsuspened-customer-management-button",
            "button"
          ) === true ? (
          <ButtonGreen
            title={t("management.req_suspend")}
            onClick={() => {
              Action.changeModal(dispatch, "1", { showModal: true });
            }}
          />
        ) : (
          ""
        )}

        {itemDetail.status === -1 &&
          UseAuth.checkFunction(
            "unsuspened-customer-management-button",
            "button"
          ) === true ? (
          <ButtonGreen
            title={t("management.unsuspend")}
            onClick={() => {
              Action.changeModal(dispatch, "-1", { showModal: true });
            }}
          />
        ) : (
          ""
        )}
      </div>

      {modal ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModal(dispatch, "", { showModal: showModal });
          }}
          title={
            modalStatus === "0"
              ? t("management.confirm_suspend")
              : modalStatus === "1"
                ? t("management.confirm_req_suspend")
                : t("management.confirm_unsuspend")
          }
          subtitle={
            modalStatus === "0"
              ? t("management.subtitle_customer_suspend")
              : modalStatus === "1"
                ? t("management.subtitle_customer_req_suspend")
                : t("management.subtitle_customer_unsuspend")
          }
          onClick={({ remark }) => {
            Action.handleSubmit(dispatch, modalStatus, {
              remarks: remark,
              id: itemDetail.customerId,
            });
          }}
        />
      ) : null}

      {modalImage ? (
        <ModalImage
          onCancel={({ showModal }) => {
            Action.changeModalImage(dispatch, { showModal: showModal });
          }}
          title="ktp"
          img={itemDetail.ktp}
        />
      ) : null}

      {remark && (
        <PopupTable
          onCancel={() => {
            dispatch(setRemark(false));
          }}
          id={itemDetail.customerId}
        />
      )}

      {modalTransaction && (
        <TransactionHistory
          onCancel={() => {
            dispatch(setModalTransaction(false));
          }}
          id={itemDetail.customerId}
        />
      )}
    </div>
  );
};

export default Detail;;
