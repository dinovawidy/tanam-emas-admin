import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../components/ButtonGreen/ButtonGreen";
import { setPopup } from "../redux/Reducer";
import PopupWithdraw from "./PopupWithdraw";
import Action from "../redux/Action";
import GeneralUtility from "../../../utils/general-utility";
import UseAuth from "../../auth/Auth";

const DetailBalance = () => {
  const dispatch = useDispatch();
  const popup = useSelector((state) => state.reducer.popup);
  const data = useSelector((state) => state.reducer.data);
  const inquiry = useSelector((state) => state.reducer.inquiry);
  const canWithdraw = useSelector((state) => state.reducer.canWithdraw);

  const t = useTranslation();

  return (
    <div className="bg-gray-primary rounded-xl py-4 px-2 ">
      <div className="text-sm text-gray-secondary font-semibold ml-3 mb-4">
        {t("balance.details").toUpperCase()}
      </div>
      <div className="bg-white rounded-xl m-2">
        <div className="flex p-2">
          <div>
            <div className="text-xs text-green-quaternary">
              {t("balance.title")}
            </div>
          </div>
          <div className="flex-1 text-right">
            <div className="text-green-primary text-xl font-extrabold">
              <span className="text-sm align-top">Rp </span>
              {data > 0 ? GeneralUtility.addCommas(data) : 0}
            </div>
          </div>
        </div>
      </div>
      {UseAuth.checkFunction("withdraw-admin-button", "button") === true ? (
      <div className="text-right pt-3">
        {canWithdraw.canWithdrawal === true ? (
          <ButtonGreen
            title={t("balance.withdraw")}
            onClick={() => {
              dispatch(setPopup(true));
            }}
          />
        ) : (
          <button className="button md:w-36 text-xs tracking-widest font-bold text-green-secondary border-2 border-green-secondary border-opacity-40 rounded-xl py-2">
            {t("balance.withdraw").toUpperCase()}
          </button>
        )}
      </div>
      ): ""}

      {popup && (
        <PopupWithdraw
          onCancel={() => {
            dispatch(setPopup(false));
          }}
          data={inquiry}
          onSubmit={() => {
            Action.postWd(dispatch);
          }}
        />
      )}
    </div>
  );
};

export default DetailBalance;
