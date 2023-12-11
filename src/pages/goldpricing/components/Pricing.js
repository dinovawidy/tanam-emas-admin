// import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../components/ButtonGreen/ButtonGreen";
import GeneralUtility from "../../../utils/general-utility";
// import Pagination from "../../../components/Pagination/Pagination";
import Action from "../redux/Action";

const Pricing = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const newPrice = useSelector((state) => state.reducer.newPrice);

  return (
    <div className="section-grey p-2 overflow-y-auto">
      <h2 className="text-sm p-2 font-medium text-[#A7ADA9]">
        {t("goldpricing.pricing").toUpperCase()}
      </h2>
      <h3 className="text-md p-2 font-bold text-green-primary">
        {t("goldpricing.set_new_pricing")}
      </h3>
      <div className="flex flex-row p-2 items-center">
        <label className="font-medium text-green-quaternary mr-3">
          {t("goldpricing.buyback_price")}
        </label>
        <div className="flex-1 ">
          <div className="min-w-fit relative block">
            <span className="absolute inset-y-0 left-1.5 flex items-center pl-2 font-bold">
              Rp
            </span>
            <input
              type="text"
              value={newPrice}
              placeholder={t("goldpricing.input_price")}
              onChange={(e) => {
                Action.handleChange(
                  GeneralUtility.addSeparator(e.target.value),
                  dispatch
                );
              }}
              className="pl-10 pr-14 w-full block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white placeholder:text-slate-40"
            />
            <span className="absolute inset-y-0 right-1.5 flex items-center pr-2 font-bold">
              /gram
            </span>
          </div>
        </div>
      </div>
      <div className="flex p-2 justify-end">
        <ButtonGreen
          title={t("goldpricing.update_price")}
          onClick={() => {
            Action.changeShowConfirmModal(dispatch, { showModal: true });
          }}
        />
      </div>
    </div>
  );
};

export default Pricing;
