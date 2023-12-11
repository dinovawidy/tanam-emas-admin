import React from "react";
import { useTranslation } from "react-multi-lang";
import DateUtility from "../../../utils/date-utility";
import GeneralUtility from "../../../utils/general-utility";

const BalanceItem = ({ items }) => {
  const t = useTranslation();
  let statusName;
  let statusColor;
  let statusTextColor;
  switch (items.withdrawalStatus) {
    case "COMPLETED":
      statusName = t("general.completed");
      statusColor = "bg-[#A7FFA1]";
      statusTextColor = "text-[#047100]";
      break;
    case "CANCELED":
      statusName = t("general.cancelled");
      statusColor = "bg-[#FF9191]";
      statusTextColor = "text-white";
      break;
    case "PROCESSED":
      statusName = t("general.pending");
      statusColor = "bg-[#FCB769]";
      statusTextColor = "text-white";
      break;
    case "RECEIVED":
      statusName = t("general.received");
      statusColor = "bg-[#A7FFA1]";
      statusTextColor = "text-[#047100]";
      break;
    default:
      statusName = "";
      statusColor = "";
      statusTextColor = "";
      break;
  }

  let reverse = items.dateTime;
  let dateObj = new Date(reverse);
  let result = DateUtility.formatDate(dateObj, "full");

  return items.withdrawalAmount !== null ? (
    <>
      <div className="bg-white rounded-xl m-2">
        <div className="sm:text-sm flex flex-row p-5">
          <div className="flex-1">
            <span className="text-green-quaternary font-semibold">
              {result}
            </span>
          </div>
          <div>
            <span
              className={`px-2 py-1 ${statusColor} ${statusTextColor} rounded-md`}
            >
              {statusName}
            </span>
          </div>
        </div>

        <hr />
        <div className="mt-1 p-5">
          <div className="text-md font-bold">{t("balance.withdrawal")}</div>
          <p className="mb-3 font-bold text-green-400">
            Rp{GeneralUtility.addCommas(items.withdrawalAmount)}
          </p>

          <div className="text-md font-bold">{t("balance.withdrawal_fee")}</div>
          <p className="mb-3 font-bold text-red-600">
            -Rp{GeneralUtility.addCommas(items.withdrawalFee)}
          </p>
        </div>

        <div className="flex p-5">
          <div className="text-green-quaternary font-semibold">
            {t("balance.total_amount_wd")}
          </div>
          <div className="flex-1 text-right text-red-500 text-md font-bold">
            <span className="text-sm align-top">- Rp </span>
            {GeneralUtility.addCommas(items.total)}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="bg-white rounded-xl m-2">
      <div className="sm:text-sm flex flex-row p-5">
        <div className="flex-1">
          <button className="text-gold-secondary font-semibold">
            {items.invoiceNumber}
          </button>
          <span className="text-green-quaternary font-semibold">
            / {result}
          </span>
        </div>
        <div></div>
      </div>

      <hr />
      <div className="mt-1 p-5">
        {items.cancellationFee !== null ? (
          <>
            <div className="text-md font-bold">
              {t("balance.merchant_cancelation")}
            </div>
            <p className="mb-3 font-bold text-green-400">
              Rp{GeneralUtility.addCommas(items.cancellationFee)}
            </p>
          </>
        ) : (
          ""
        )}

        {items.commission !== null ? (
          <>
            <div>
              <div className="flex pb-2 mb-3">
                <div className="flex space-5 mr-8">
                  <div className="text-green-quaternary font-semibold">
                    {t("balance.merchant_id")}
                  </div>
                  <p className="font-bold ml-3">{items.merchantId}</p>
                </div>
                <div className="flex mr-3">
                  <div className="text-green-quaternary font-semibold">
                    {t("balance.merchant_name")}
                  </div>
                  <p className="font-bold ml-3">{items.merchantName}</p>
                </div>
              </div>

              <div className="flex pb-2 mb-5">
                <div>
                  <div className="text-green-quaternary font-semibold">
                    {t("balance.no_resi")}
                  </div>
                </div>

                <div>
                  <p className="font-bold ml-3">{items.noResi}</p>
                </div>
              </div>
            </div>
            <div className="text-md font-bold">
              {t("balance.product_commision")}
            </div>
            <p className="mb-3 font-bold text-green-400">
              Rp{GeneralUtility.addCommas(items.commission)}
            </p>
          </>
        ) : (
          ""
        )}

        {items.applicationServiceFee !== null ? (
          <>
            <div className="text-md font-bold">
              {t("balance.application_service_fee")}
            </div>
            <p className="mb-3 font-bold text-green-400">
              Rp{GeneralUtility.addCommas(items.applicationServiceFee)}
            </p>
          </>
        ) : (
          ""
        )}

        {items.commission !== null ? (
          <>
            <div className="text-md font-bold">{t("balance.shipping")}</div>
            <p className="mb-3 font-bold text-green-400">
              Rp{GeneralUtility.addCommas(items.shippingCost)}
            </p>
            <div className="text-md font-bold">{t("balance.insurance")}</div>
            <p className="mb-3 font-bold text-green-400">
              Rp{GeneralUtility.addCommas(items.shippingInsurance)}
            </p>
          </>
        ) : (
          ""
        )}
      </div>
      <hr />
      <div className="flex p-5">
        <div className="text-green-quaternary font-semibold">
          {t("balance.received")}
        </div>
        <div className="flex-1 text-right text-green-primary text-md font-bold">
          <span className="text-sm align-top">Rp </span>
          {GeneralUtility.addCommas(items.total)}
        </div>
      </div>
    </div>
  );
};

export default BalanceItem;
