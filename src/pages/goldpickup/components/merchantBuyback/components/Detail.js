import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import GeneralUtility from "../../../../../utils/general-utility";
import Action from "../redux/Action";

const Detail = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  // const ticketList = useSelector((state) => state.reducer.ticketList);
  const idList = useSelector((state) => state.reducer.idList);
  const totalWeight = useSelector((state) => state.reducer.totalWeight);
  const totalQuantity = useSelector((state) => state.reducer.totalQuantity);
  const totalPrice = useSelector((state) => state.reducer.totalPrice);
  return (
    <div className="font-medium text-sm">
      <h4 className="flex-1 opacity-60 font-bold pb-4">
        {t("management.details").toUpperCase()}
      </h4>

      <div className="max-h-92 overflow-y-auto">
        <div className="pb-2">
          <p className="text-green-quaternary">
            {t("goldpickup.total_selected")}
          </p>
          <p className="font-bold text-md">{idList.length}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("buyback.ticket_id")}</p>
          <p className="font-bold text-md">{idList.join(", ")}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("buyback.total_weight")}</p>
          <p className="font-bold text-md">{totalWeight} gram</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("buyback.total_quantity")}</p>
          <p className="font-bold text-md">{totalQuantity} pcs</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("buyback.total_price")}</p>
          <p className="font-bold text-md">
            Rp {GeneralUtility.addSeparator(totalPrice)}
          </p>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-x-2">
        <ButtonGreen
          title={t("goldpickup.request_pickup")}
          onClick={() => {
            Action.changePickupMethod(dispatch, { pickupMethod: "" });
            Action.changePickupDate(dispatch, { pickupDate: "" });
            Action.changeRemarks(dispatch, { remarks: "" });
            Action.changeShowModal(dispatch, { showModal: true });
          }}
        />
      </div>
    </div>
  );
};

export default Detail;
