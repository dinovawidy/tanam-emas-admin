import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ConfirmationModal from "../../../../../components/ConfirmationModal/ConfirmationModal";
import Action from "../redux/Action";
import ModalImage from "../../../../../components/ModalImage/ModalImage";
import EditModal from "./EditModal";
import PopupConfirmation from "../../../../../components/PopupConfirmation/PopupConfirmation";
import UseAuth from "../../../../auth/Auth";
import PopupUtility from "../../../../../utils/popup-utility";
import { setRemark } from "../redux/Reducer";
import PopupTable from "./PopupTable";

const Detail = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const modalImage = useSelector((state) => state.reducer.modalImage);
  const modalEdit = useSelector((state) => state.reducer.modalEdit);
  const titleImage = useSelector((state) => state.reducer.titleImage);
  const srcImage = useSelector((state) => state.reducer.srcImage);
  const detailMerchant = useSelector((state) => state.reducer.detailMerchant);
  const buybackCompability = useSelector(
    (state) => state.reducer.buybackCompability
  );
  const modal = useSelector((state) => state.reducer.modal);
  const modalStatus = useSelector((state) => state.reducer.modalStatus);
  const remark = useSelector((state) => state.reducer.remark);
  const image = [
    {
      id: 1,
      title: "NPWP",
      img: detailMerchant.uploadedDocument[0].npwpFile,
    },
    {
      id: 2,
      title: "KTP",
      img: detailMerchant.uploadedDocument[0].ktpFile,
    },
  ];

  const enumStatus = Object.freeze({
    "-3": t("management.status_off"),
    "-2": t("management.decline"),
    "-1": t("management.suspended"),
    0: t("management.req_suspended"),
    1: t("management.active"),
    2: t("management.submited"),
    3: t("management.req_approve"),
    4: t("management.approve"),
  });

  return (
    <div className="font-medium text-sm">
      <div className="flex flex-row items-center pb-4">
        <h4 className="flex-1 opacity-60 font-bold">
          {t("management.details").toUpperCase()}
        </h4>
        {UseAuth.checkFunction()}
        <i className="cursor-pointer">
          <img
            src={process.env.REACT_APP_ASSETS_IMAGE + "edit-icon.svg"}
            alt="edit-icon"
            onClick={() => {
              Action.changeModal(dispatch, "3", { showModal: true });
            }}
          />
        </i>
      </div>
      <div className="h-72 overflow-y-auto max-w-xs">
        <div className="flex flex-row pb-3">
          <div className="flex flex-row items-center flex-1">
            <div className="w-24">
              <img
                className="h-full w-full rounded-xl"
                src={detailMerchant.merchantPhoto}
                alt="merchant"
              />
            </div>
            <div className="flex-1 pl-2">
              <p className="text-green-quaternary">
                {t("management.merchant_id")}
              </p>
              <p name="merchantId" className="font-bold text-md">
                {detailMerchant.id}
              </p>

              <p className="text-green-quaternary pt-2">
                {t("management.merchant_name")}
              </p>
              <p className="font-bold text-md">{detailMerchant.merchantName}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="min-w-fit py-1 px-3 text-center text-green-primary font-bold rounded-xl border-2 border-green-secondary border-opacity-40">
              {enumStatus[detailMerchant.status]}
            </div>
          </div>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.rating")}</p>
          <p className="font-bold text-md">
            <div className="flex items-center">
              <img src={process.env.REACT_APP_ASSETS_IMAGE + "star-ratings.svg"} alt="star ratings" />
              <span className="block ml-1 -mb-0.5">{detailMerchant.rating}</span>
            </div>
          </p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.email")}</p>
          <p className="font-bold text-md">{detailMerchant.email}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.phone_no")}</p>
          <p className="font-bold text-md">
            {detailMerchant.countryCode.dialCode + " "}
            {detailMerchant.phoneNumber}
          </p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.address")}</p>
          <p className="font-bold text-md">{detailMerchant.address}</p>
        </div>

        <div className="pb-2 flex flex-row">
          <div className="flex-1">
            <p className="text-green-quaternary">{t("management.ba_name")}</p>
            <p className="font-bold text-md">
              {detailMerchant.bankAccountName}
            </p>
          </div>
          <div>
            <p className="text-green-quaternary">{t("management.ba_number")}</p>
            <p className="font-bold text-md">
              {detailMerchant.bankAccountNumber}
            </p>
          </div>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.nik")}</p>
          <p className="font-bold text-md">{detailMerchant.nik}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.npwp")}</p>
          <p className="font-bold text-md">{detailMerchant.npwp}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.nib")}</p>
          <p className="font-bold text-md">{detailMerchant.nib}</p>
        </div>

        {UseAuth.checkFunction(
          "buybackcompability-merchant-management-button",
          "button"
        ) === true ? (
          <div className="pl-1">
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                className="sr-only peer"
                type="checkbox"
                name="status"
                checked={
                  detailMerchant.status === 1
                    ? detailMerchant.buybackCompability
                    : false
                }
                onChange={(e) => {
                  if (detailMerchant.status === 1) {
                    if (e.target.checked === false) {
                      Action.changeBuybackCompability(dispatch, e, {
                        id: detailMerchant.merchantId,
                      });
                    } else {
                      Action.changeModal(dispatch, "2", { showModal: true });
                    }
                  } else {
                    PopupUtility.responseValidate(
                      "Only active merchant status can do Buyback Compatibility"
                    );
                  }
                }}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-primary"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {t("management.buyback_compability")}
              </span>
            </label>
          </div>
        ) : (
          ""
        )}

        {UseAuth.checkFunction(
          "uploaddoc-merchant-management-button",
          "button"
        ) === true ? (
          <div className="pb-4">
            <p className="text-green-quaternary">
              {t("management.upload_doc")}
            </p>
            <div className="flex flex-row gap-x-2 pt-1">
              {image.map((item, index) => (
                <div
                  className="flex flex-col justify-center text-center cursor-pointer"
                  key={index}
                  onClick={() => {
                    Action.changeModalImage(dispatch, {
                      showModal: true,
                      title: item.title,
                      img: item.img,
                    });
                  }}
                >
                  <img
                    className="h-10"
                    src={process.env.REACT_APP_ASSETS_IMAGE + "file-icon.svg"}
                    alt="uploaded-icon"
                  />
                  <p className="font-bold text-xs pt-1">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}

        {detailMerchant.remark.length > 0 && (
          <>
            <hr />
            <div className="pb-2 pt-4">
              <p className="text-green-quaternary">
                {t("management.suspended_by")}
              </p>
              <p className="font-bold text-md">
                {detailMerchant.remark[0].writer}
              </p>
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
              <p className="font-bold text-md">
                {detailMerchant.remark[0].remark}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-row-reverse gap-x-2">
        {detailMerchant.status === 0 &&
          UseAuth.checkFunction(
            "suspened-merchant-management-button",
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

        {detailMerchant.status === 1 &&
          UseAuth.checkFunction(
            "reqsuspened-merchant-management-button",
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

        {detailMerchant.status === -1 &&
          UseAuth.checkFunction(
            "unsuspened-merchant-management-button",
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
              ? t("management.subtitle_merchant_suspend")
              : modalStatus === "1"
                ? t("management.subtitle_merchant_req_suspend")
                : t("management.subtitle_merchant_unsuspend")
          }
          onClick={({ remark }) => {
            Action.handleSubmit(dispatch, modalStatus, {
              remarks: remark,
              id: detailMerchant.merchantId,
            });
          }}
        />
      ) : null}

      {modalImage ? (
        <ModalImage
          onCancel={({ showModal }) => {
            Action.changeModalImage(dispatch, { showModal: showModal });
          }}
          title={titleImage}
          img={srcImage}
        />
      ) : null}

      {modalEdit && (
        <EditModal
          onCancel={() => {
            Action.changeModal(dispatch, "3", { showModal: false });
          }}
          onSubmit={() => {
            Action.submitEditMerchant(dispatch, detailMerchant);
          }}
        />
      )}

      {buybackCompability && (
        <PopupConfirmation
          title={t("management.buyback_activation")}
          subtitle={t("management.buyback_activation_subtitle")}
          onCancel={() => {
            Action.changeModal(dispatch, "2", { showModal: false });
          }}
          onSubmit={(e) => {
            Action.changeBuybackCompability(dispatch, e, {
              id: detailMerchant.merchantId,
            });
          }}
        />
      )}

      {remark && (
        <PopupTable
          onCancel={() => {
            dispatch(setRemark(false));
          }}
          id={detailMerchant.merchantId}
        />
      )}
    </div>
  );
};

export default Detail;
