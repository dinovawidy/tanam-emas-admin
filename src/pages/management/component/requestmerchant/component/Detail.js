import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../components/ButtonWhite/ButtonWhite";
import ConfModalWithImage from "../../../../../components/ConfModalWithImage/ConfModalWithImage";
import ModalImage from "../../../../../components/ModalImage/ModalImage";
import Action from "../redux/Action";
import EditModal from "./EditModal";
import UseAuth from "../../../../auth/Auth";

const Detail = ({ page, search, postPerPage, getTotal }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const modalReqApprove = useSelector((state) => state.reducer.modalReqApprove);
  const modalApprove = useSelector((state) => state.reducer.modalApprove);
  const modalDecline = useSelector((state) => state.reducer.modalDecline);
  const modalImage = useSelector((state) => state.reducer.modalImage);
  const titleImage = useSelector((state) => state.reducer.titleImage);
  const srcImage = useSelector((state) => state.reducer.srcImage);
  const detailMerchant = useSelector((state) => state.reducer.detailMerchant);
  const modalEdit = useSelector((state) => state.reducer.modalEdit);
  const loadingBtn = useSelector((state) => state.reducer.loadingBtn);
  const image = [
    {
      id: 1,
      title: "NPWP",
      img: detailMerchant.npwpFile,
    },
    {
      id: 2,
      title: "KTP",
      img: detailMerchant.ktpFile,
    },
  ];

  const enumStatus = Object.freeze({
    "-3": t("management.status_off"),
    "-2": t("management.decline"),
    "-1": t("management.suspended"),
    0: t("management.req_suspended"),
    1: t("management.active"),
    2: t("general.submitted"),
    3: t("management.req_approve"),
    4: t("management.approval"),
  });

  return (
    <div className="font-medium text-sm">
      <div className="flex flex-row items-center pb-4">
        <h4 className="flex-1 opacity-60 font-bold">
          {t("management.details").toUpperCase()}
        </h4>
        <i className="cursor-pointer">
          <img
            src={process.env.REACT_APP_ASSETS_IMAGE + "edit-icon.svg"}
            alt="edit-icon"
            onClick={() => {
              Action.changeModalEdit(dispatch, { showModal: true });
            }}
          />
        </i>
      </div>

      <div className="h-72 overflow-y-auto max-w-xs">
        <div className="flex flex-row pb-2">
          <div className="flex flex-row items-center gap-x-4 flex-1">
            <div className=" bg-black">
              <img
                className=" h-24"
                src={detailMerchant.merchantPhoto}
                alt="merchant"
              />
            </div>
            <div className="flex-1 ">
              <p className="text-green-quaternary">
                {t("management.merchant_id")}
              </p>
              <p className="font-bold text-md">{detailMerchant.id}</p>

              <p className="text-green-quaternary pt-2">
                {t("management.merchant_name")}
              </p>
              <p className="font-bold text-md">{detailMerchant.merchantName}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="w-fit py-1 px-2 text-center text-green-primary font-bold rounded-xl border-2 border-green-secondary border-opacity-40">
              {enumStatus[detailMerchant.status]}
            </div>
          </div>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.email")}</p>
          <p className="font-bold text-md">{detailMerchant.email}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.phone_no")}</p>
          <p className="font-bold text-md">
            {detailMerchant.countryCode_dialCode +
              " " +
              detailMerchant.phoneNumber}
          </p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.address")}</p>
          <p className="font-bold text-md">{detailMerchant.address}</p>
        </div>

        <div className="pb-2 flex flex-row">
          <div className="flex-1">
            <p className="text-green-quaternary">{t("management.ba_name")}</p>
            <p className="font-bold text-md">{detailMerchant.bankName}</p>
          </div>
          <div>
            <p className="text-green-quaternary">{t("management.ba_number")}</p>
            <p className="font-bold text-md">{detailMerchant.bankNumber}</p>
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

        <div className="pb-4">
          <p className="text-green-quaternary">{t("management.upload_doc")}</p>
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

        <hr />

        {detailMerchant.remarks !== null ? (
          <>
            <div className="pb-2">
              <p className="text-green-quaternary">{t("helpcenter.remarks")}</p>
              <p className="font-bold text-md">{detailMerchant.remarks}</p>
            </div>
          </>
        ) : (
          ""
        )}

        {/* DICOMMENT SOALNYA BELUM ADA DATANYA */}
        {/* <div className="bg-white w-full p-5">
          <div className="pb-2">
            <p className="text-green-quaternary">
              {t("management.reviewed_by")}
            </p>
            <p className="font-bold text-md">09.254.785.3-401.023</p>
          </div>

          <div className="pb-2">
            <p className="text-green-quaternary">{t("management.remarks")}</p>
            <p className="font-bold text-md">All Clear</p>
          </div>

          <div className="flex flex-row gap-x-3">
            <div></div>
            <div></div>
          </div>
        </div> */}
      </div>

      <div className="flex flex-row-reverse gap-x-2">
        {detailMerchant.status === 3 &&
        UseAuth.checkFunction(
          "approve-merchant-management-button",
          "button"
        ) === true ? (
          <ButtonGreen
            title={t("management.approve")}
            onClick={async () => {
              Action.changeModalApprove(dispatch, { showModal: true });
            }}
            disabled={loadingBtn}
          />
        ) : null}
        {detailMerchant.status === 2 &&
        UseAuth.checkFunction(
          "reqapproval-merchant-management-button",
          "button"
        ) === true ? (
          <ButtonGreen
            title={t("management.req_approve")}
            onClick={() => {
              Action.changeModalReqApprove(dispatch, { showModal: true });
            }}
          />
        ) : null}

        {UseAuth.checkFunction(
          "decline-merchant-management-button",
          "button"
        ) === true ? (
          <ButtonWhite
            title={t("management.decline")}
            onClick={() => {
              Action.changeModalDecline(dispatch, { showModal: true });
            }}
          />
        ) : (
          ""
        )}
      </div>

      {modalReqApprove ? (
        <ConfModalWithImage
          onCancel={({ showModal }) => {
            Action.changeModalReqApprove(dispatch, { showModal: showModal });
          }}
          title={t("management.confirm_request_merchant")}
          onClick={async ({ remark }) => {
            await Action.handleSubmitReqApprove(dispatch, {
              item: detailMerchant,
              remarks: remark,
            });
            Action.getList(dispatch, {
              page: page,
              search: search,
              postPerPage: postPerPage,
            });
          }}
        />
      ) : null}

      {modalApprove ? (
        <ConfModalWithImage
          onCancel={({ showModal }) => {
            Action.changeModalApprove(dispatch, { showModal: showModal });
          }}
          title={t("management.confirm_request_merchant")}
          onClick={async ({ remark }) => {
            await Action.handleSubmitApprove(dispatch, {
              item: detailMerchant,
              remarks: remark,
            });
            Action.getList(dispatch, {
              page: page,
              search: search,
              postPerPage: postPerPage,
            });
            getTotal();
          }}
        />
      ) : null}

      {modalDecline ? (
        <ConfModalWithImage
          onCancel={({ showModal }) => {
            Action.changeModalDecline(dispatch, { showModal: showModal });
          }}
          title={t("management.confirm_request_merchant")}
          onClick={async ({ remark }) => {
            Action.handleSubmitDecline(dispatch, {
              item: detailMerchant,
              remarks: remark,
            });
            Action.getList(dispatch, {
              page: page,
              search: search,
              postPerPage: postPerPage,
            });
            getTotal();
          }}
        />
      ) : (
        ""
      )}

      {modalImage ? (
        <ModalImage
          onCancel={({ showModal }) => {
            Action.changeModalImage(dispatch, { showModal: showModal });
          }}
          title={titleImage}
          img={srcImage}
        />
      ) : null}

      {modalEdit ? (
        <EditModal
          onCancel={() => {
            Action.changeModalEdit(dispatch, { showModal: false });
          }}
          data={detailMerchant}
          onSubmit={(e) => {
            // Action.submitEditMerchant(dispatch, detailMerchant)
          }}
        />
      ) : null}
    </div>
  );
};

export default Detail;
