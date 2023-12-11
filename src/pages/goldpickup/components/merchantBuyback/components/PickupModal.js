import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../components/ButtonWhite/ButtonWhite";
import Action from "../redux/Action";
import { default as MainAction } from "../../../redux/Action";
import DatePickerComponent from "../../../../../components/DatePickerComponent/DatePickerComponent";
import { setErrorPickUp } from "../redux/Reducer";

const PickupModal = ({ mainStore, selectedMerchant }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const ticketList = useSelector((state) => state.reducer.ticketList);
  const ticketId = useSelector((state) => state.reducer.ticketId);
  const idList = useSelector((state) => state.reducer.idList);
  const totalWeight = useSelector((state) => state.reducer.totalWeight);
  const totalQuantity = useSelector((state) => state.reducer.totalQuantity);

  const pickupMethod = useSelector(
    (state) => state.reducer.selectedPickupMethod
  );
  const pickupDate = useSelector((state) => state.reducer.selectedPickupDate);
  const remarks = useSelector((state) => state.reducer.remarks);
  // const canSave = useSelector((state) => state.reducer.canSave);
  const errorPickUp = useSelector((state) => state.reducer.errorPickUp);

  const handleValidation = () => {
    const values = {
      pickupMethod: pickupMethod,
      pickupDate: pickupDate,
      remarks: remarks,
    };

    const errors = Action.validate(dispatch, values);

    if (Object.keys(errors).length === 0) {
      Action.submitRequest(dispatch, {
        ticketId: ticketId,
        merchantId: selectedMerchant.id,
        weightTotal: totalWeight,
        quantity: totalQuantity,
        pickupMethod: pickupMethod,
        pickupDate: pickupDate,
        remarks: remarks,
        buybackId: ticketList,
      });
      Action.changeShowModal(dispatch, { showModal: false });
      MainAction.getPage(mainStore, { page: "pickups" });
    } else {
    }
  };

  const today = new Date();

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => {
            Action.changeShowModal(dispatch, { showModal: false });
          }}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-primary rounded-lg shadow-lg">
            <div className="m-3">
              <h3 className="text-green-primary font-bold">
                {t("goldpickup.gold_pickup_request")}
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-y-4">
                <label className="font-bold">
                  {t("goldpickup.pickup_ticket_id")}
                </label>
                <p>{ticketId}</p>
                <label className="font-bold">
                  {t("dashboard.merchant_name")}
                </label>
                <p>{selectedMerchant.name}</p>
                <label className="font-bold">{t("management.address")}</label>
                <p>{selectedMerchant.address}</p>
                <label className="font-bold">
                  {t("goldpickup.buyback_ids")}
                </label>
                <p>{idList.join(", ")}</p>
                <label className="font-bold">{t("buyback.total_weight")}</label>
                <p>{totalWeight} gram</p>
                <label className="font-bold">{t("buyback.quantity")}</label>
                <p>{totalQuantity} pcs</p>
                <label className="font-bold">
                  {t("goldpickup.pickup_method")}
                </label>
                <div>
                  <select
                    className={`sm:text-sm shadow-sm border border-gray-primary bg-white rounded-xl ${
                      errorPickUp.pickupMethod
                        ? "border-red-500 border-1"
                        : "border-1"
                    }`}
                    name="status"
                    id="status"
                    value={pickupMethod}
                    onChange={(e) => {
                      Action.changePickupMethod(dispatch, {
                        pickupMethod: e.target.value,
                      });
                    }}
                  >
                    <option value="" disabled hidden>
                      {t("goldpickup.set_pickup_method_placeholder")}
                    </option>
                    <option value={1}>Third Party Courier</option>
                    <option value={2}>Self-pickup</option>
                  </select>
                  <p className="text-red-500">{errorPickUp.pickupMethod}</p>
                </div>
                <label className="font-bold mt-5">
                  {t("goldpickup.pickup_date")}
                </label>
                <div>
                  <DatePickerComponent
                    value={pickupDate}
                    format="MMM DD, YYYY"
                    onChange={(dateObject) => {
                      let d0 = new Date(dateObject);
                      Action.changePickupDate(dispatch, {
                        pickupDate: d0.toISOString(),
                      });
                    }}
                    placeholder={t("goldpickup.set_date_placeholder")}
                    // inputClass="block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white placeholder:text-slate-40 cursor-pointer"
                    inputClass={`block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white placeholder:text-slate-40 cursor-pointer ${
                      errorPickUp.pickupDate
                        ? "border-red-500 border-1"
                        : "border-0"
                    }`}
                  />
                  <p className="text-red-500">{errorPickUp.pickupDate}</p>
                </div>
                <label className="font-bold">{t("helpcenter.remarks")}</label>
                <div>
                  <textarea
                    rows="4"
                    placeholder={t("helpcenter.remarks")}
                    value={remarks}
                    onChange={(e) => {
                      Action.changeRemarks(dispatch, {
                        remarks: e.target.value,
                      });
                    }}
                    className={`text-sm max-h-[10rem] bg-white ${
                      errorPickUp.remarks
                        ? "border-red-500 border-1"
                        : "border-0"
                    }`}
                    maxLength="300"
                  />
                  {errorPickUp.remarks ? (
                    <p className="text-red-500">{errorPickUp.remarks}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="items-center gap-2 mt-3 flex justify-end">
                <ButtonWhite
                  title={t("general.cancel")}
                  onClick={() => {
                    Action.changeShowModal(dispatch, { showModal: false });
                    dispatch(setErrorPickUp({}));
                  }}
                />
                <ButtonGreen
                  title={t("general.submit")}
                  onClick={() => {
                    handleValidation();
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

export default PickupModal;
