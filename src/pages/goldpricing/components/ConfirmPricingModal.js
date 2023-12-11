import { useState } from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../components/ButtonWhite/ButtonWhite";
import Action from "../redux/Action";

const ConfirmPricingModal = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const newPrice = useSelector((state) => state.reducer.newPrice);
  const startDate = useSelector((state) => state.reducer.startDate);
  const endDate = useSelector((state) => state.reducer.endDate);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => {
            Action.changeShowConfirmModal(dispatch, { showModal: false });
          }}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-primary rounded-lg shadow-lg">
            <div className="m-3">
              <h3 className="text-green-primary font-bold">
                {t("goldpricing.confirm_new_price")}
              </h3>
              <div className="mt-5 flex section-white p-3">
                <div className="flex-1 text-[#A7ADA9]">
                  {t("goldpricing.buyback_price")}
                </div>
                <div className="text-lg font-bold text-green-primary">
                  <span className="text-sm align-top">Rp</span> {newPrice}{" "}
                  <span className="text-sm align-top">/gram</span>
                </div>
              </div>
              <div className="items-center gap-2 mt-3 flex justify-end">
                <ButtonWhite
                  title={t("general.cancel")}
                  onClick={() => {
                    Action.changeShowConfirmModal(dispatch, {
                      showModal: false,
                    });
                  }}
                />
                <ButtonGreen
                  title={t("general.submit")}
                  onClick={() => {
                    Action.handlePrice(dispatch, {
                      price: newPrice,
                      page: 0,
                      startDate: startDate,
                      endDate: endDate,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPricingModal;
