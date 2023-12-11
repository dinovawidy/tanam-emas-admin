import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../components/ButtonWhite/ButtonWhite";
import DateUtility from "../../../../../utils/date-utility";
import Action from "../redux/Action";

const Detail = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const itemDetail = useSelector((state) => state.reducer.itemDetail);

  const statusPickup = Object.freeze({
    1: "Third Party Courier",
    2: "Self Pickup",
  });

  const statusGoldPickup = Object.freeze({
    "-3": "Issued",
    "-2": "Not Match",
    "-1": "Cancelled",
    0: "Accepted",
    1: "Picked up by Courier",
    2: "Received",
    3: "Finished",
  });
  
  return (
    <div className="font-medium text-sm">
      <h4 className="flex-1 opacity-60 font-bold pb-4">
        {t("management.details").toUpperCase()}
      </h4>

      <div className="max-h-92 overflow-y-auto">
        <div className="flex flex-row items-center pb-2">
          <div className="flex-1">
            <p className="text-green-quaternary">
              {t("goldpickup.pickup_ticket_id")}
            </p>
            <p className="font-bold text-md">{itemDetail.ticketId}</p>
          </div>
          <div className="text-right">
            <div className="px-4 py-1 text-green-primary font-bold rounded-xl border-2 border-green-secondary border-opacity-40">
              {statusGoldPickup[itemDetail.status]}
            </div>
          </div>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("goldpickup.pickup_date")}</p>
          <p className="font-bold text-md">
            {DateUtility.formatDate(itemDetail.pickupDate, "half")}
          </p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">
            {t("management.merchant_name")}
          </p>
          <p className="font-bold text-md">{itemDetail.merchantName}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.address")}</p>
          <p className="font-bold text-md">{itemDetail.address}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("goldpickup.buyback_ids")}</p>
          <p className="font-bold text-md">{itemDetail.buybackId.join(", ")}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("buyback.total_weight")}</p>
          <p className="font-bold text-md">{itemDetail.weightTotal}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("buyback.quantity")}</p>
          <p className="font-bold text-md">{itemDetail.quantity} pcs</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">
            {t("goldpickup.pickup_method")}
          </p>
          <p className="font-bold text-md">
            {statusPickup[itemDetail.pickupMethod]}
          </p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.remarks")}</p>
          <p className="font-bold text-md">{itemDetail.remarks}</p>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-x-2">
        {itemDetail.status === "-2" || itemDetail.status === 2 ? (
          <ButtonGreen
            title={t("buyback.set_as_finished")}
            onClick={() => {
              Action.updateStatus(dispatch, itemDetail.id, 3);
            }}
          />
        ) : (
          ""
        )}

        {itemDetail.status === 1 ? (
          <>
            <ButtonGreen
              title={t("buyback.set_as_received")}
              onClick={() => {
                Action.updateStatus(dispatch, itemDetail.id, 2);
              }}
            />
            <ButtonWhite
              title={t("buyback.not_match")}
              onClick={() => {
                Action.updateStatus(dispatch, itemDetail.id, 1);
              }}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Detail;
