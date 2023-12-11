import React from "react";
import { useTranslation } from "react-multi-lang";
import ButtonWhite from "../../../components/ButtonWhite/ButtonWhite";
import ButtonGreen from "../../../components/ButtonGreen/ButtonGreen";
import GeneralUtility from "../../../utils/general-utility";

const PopupWithdraw = ({ onCancel, data, onSubmit }) => {
  const t = useTranslation();
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => {
          onCancel();
        }}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-primary rounded-lg shadow-lg">
          <div className="m-3">
            <h3 className="text-green-primary font-bold">
              {t("balance.withdrawal")}
            </h3>
            <div className="mt-5 grid grid-cols-5 gap-y-3">
              <div className="col-span-2 font-bold">
                {t("balance.bank_detail")}
              </div>
              <div className="col-span-3 text-semibold">
                {data.bankName} - {data.accountNumber}
              </div>
              <div className="col-span-2 font-bold">
                {t("balance.recipient_name")}
              </div>
              <div className="col-span-3 text-semibold">{data.accountName}</div>
              <div className="col-span-2 font-bold">{t("balance.balance")}</div>
              <div className="col-span-3 text-semibold">
                Rp {GeneralUtility.addCommas(data.balance)}
              </div>
              <div className="col-span-2 font-bold">
                {t("balance.withdrawal_fee")}
              </div>
              <div className="col-span-3 text-semibold text-red-500">
                - Rp {GeneralUtility.addCommas(data.withdrawalFee)}
              </div>
              <hr className="col-span-5 my-2" />
              <div className="col-span-2 font-bold">
                {t("balance.total_amount")}
              </div>
              <div className="col-span-3 text-semibold">
                Rp {GeneralUtility.addCommas(data.total)}
              </div>
            </div>
            <div className="items-center gap-2 mt-5 flex justify-end">
              <ButtonWhite
                title={t("general.cancel")}
                onClick={() => {
                  onCancel();
                }}
              />
              <ButtonGreen
                title={"withdraw"}
                onClick={() => {
                  onSubmit();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupWithdraw;
