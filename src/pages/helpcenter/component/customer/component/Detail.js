import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../components/ButtonWhite/ButtonWhite";
import ConfirmationModal from "../../../../../components/ConfirmationModal/ConfirmationModal";
import Action from "../redux/Action";
import DateUtility from "../../../../../utils/date-utility";
import UseAuth from "../../../../auth/Auth";

const Detail = () => {
  const t = useTranslation();
  const dispatch = useDispatch();

  const detailCustomer = useSelector((state) => state.reducer.detailCustomer);
  const modalReqResolved = useSelector(
    (state) => state.reducer.modalReqResolved
  );
  const modalResolved = useSelector((state) => state.reducer.modalResolved);
  const modalSendEmail = useSelector(
    (state) => state.reducer.changeModalSendEmail
  );

  const recipient = detailCustomer.email;
  const subject =
    "[" +
    detailCustomer.feedbackId +
    "]" +
    " - " +
    detailCustomer.category +
    " - " +
    detailCustomer.topic;

  function handleSendEmail() {
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}`;
  }

  const enumStatus = Object.freeze({
    1: t("helpcenter.active"),
    2: t("helpcenter.req_resolve"),
    3: t("helpcenter.resolved"),
  });
  return (
    <div className="font-medium text-sm">
      <div className="flex flex-row items-center pb-4">
        <h4 className="flex-1 opacity-60 font-bold">
          {t("helpcenter.details").toUpperCase()}
        </h4>
      </div>

      <div className="h-72 overflow-y-auto max-w-xs">
        <div className="flex flex-row items-right pb-2">
          <div className="flex-1">
            <p className="text-green-quaternary">
              {t("helpcenter.feedback_id")}
            </p>
            <p className="font-bold text-md">{detailCustomer.feedbackId}</p>
          </div>
          <div className="text-right">
            <div className="min-w-fit py-1 px-4 text-center text-green-primary font-bold rounded-xl border-2 border-green-secondary border-opacity-40">
              {enumStatus[detailCustomer.status]}
            </div>
          </div>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("helpcenter.category")}</p>
          <p className="font-bold text-md">{detailCustomer.category}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("helpcenter.topic")}</p>
          <p className="font-bold text-md">{detailCustomer.topic}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">
            {t("helpcenter.customer_name")}
          </p>
          <p className="font-bold text-md">{detailCustomer.name}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("helpcenter.email")}</p>
          <p className="font-bold text-md">{detailCustomer.email}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("helpcenter.phone_no")}</p>
          <p className="font-bold text-md">{detailCustomer.phoneNumber}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("helpcenter.issued_date")}</p>
          <p className="font-bold text-md">
            {DateUtility.formatDate(detailCustomer.issuedDate, "full")}
          </p>
        </div>

        {detailCustomer.remarks !== "" ? (
          <>
        <div className="pb-2">
          <p className="text-green-quaternary">{t("helpcenter.feedback")}</p>
          <p className="font-bold text-md">{detailCustomer.remarks}</p>
        </div>
        <hr />
        </>
        ) : ""}

        {detailCustomer.resolvedBy !== "" ? (
            <div className="pb-2 pt-4">
              <p className="text-green-quaternary">
                {t("helpcenter.resolved_by")}
              </p>
              <p className="font-bold text-md">{detailCustomer.resolvedBy}</p>
            </div>
        ) : ""}

        {detailCustomer.remarksAdmin !== "" ? (
            <div className="pb-2">
              <p className="text-green-quaternary">{t("helpcenter.remarks")}</p>
              <p className="font-bold text-md">{detailCustomer.remarksAdmin}</p>
            </div>
          
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-row-reverse gap-x-2">
        {detailCustomer.status === 1 && UseAuth.checkFunction("reqresolve-customer-helpcenter-button", "button") === true ? (
          <ButtonGreen
            title={t("helpcenter.req_resolve")}
            onClick={() => {
              Action.changeModalReqResolved(dispatch, { showModal: true });
            }}
          />
        ) : (
          ""
        )}

        {detailCustomer.status === 2 && UseAuth.checkFunction("setasresolved-customer-helpcenter-button", "button") === true ? (
          <ButtonGreen
            title={t("helpcenter.resolved")}
            onClick={() => {
              Action.changeModalResolved(dispatch, { showModal: true });
            }}
          />
        ) : (
          ""
        )}

        {detailCustomer.status === 1 && UseAuth.checkFunction("directemail-customer-helpcenter", "button") === true ? (
          <ButtonWhite
            title={t("helpcenter.direct_email")}
            onClick={handleSendEmail}
          />
        ) : (
          ""
        )}
      </div>

      {modalReqResolved ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalReqResolved(dispatch, { showModal: showModal });
          }}
          title={t("helpcenter.confirm_req_resolved")}
          subtitle={t("helpcenter.subtitle_req_resolved")}
          onClick={({ remark, identifier }) => {
            Action.handleSubmitReqResolved(dispatch, {
              remarks: remark,
              id: detailCustomer.id,
              identifier: identifier,
            });
          }}
        />
      ) : null}

      {modalResolved ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalResolved(dispatch, { showModal: showModal });
          }}
          title={t("helpcenter.confirm_resolved")}
          subtitle={t("helpcenter.subtitle_resolved")}
          onClick={({ remark, identifier }) => {
            Action.handleSubmitResolved(dispatch, {
              remarks: remark,
              id: detailCustomer.id,
              identifier: identifier,
            });
          }}
        />
      ) : null}

      {modalSendEmail ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalSendEmail(dispatch, { showModal: showModal });
          }}
          title={t("management.confirm_sendemail")}
          subtitle={t("management.subtitle_sendemail")}
          onClick={({ remark }) => {
            Action.handleSubmitSendEmail({
              remarks: remark,
            });
          }}
        />
      ) : null}
    </div>
  );
};

export default Detail;
