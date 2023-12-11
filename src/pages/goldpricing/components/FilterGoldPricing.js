import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch } from "react-redux";
import Action from "../redux/Action";
import dropdownDate from "../../../utils/dropdown-date";

const FilterGoldPricing = () => {
  const t = useTranslation();
  const dispatch = useDispatch();

  const items = React.useMemo(() => dropdownDate(), [dropdownDate]);
  return (
    <>
      <div className="self-center tracking-[1.27px] font-medium text-[#A7ADA9] mr-3">
        {t("general.filter").toUpperCase()}
      </div>
      <select
        className="section-white p-2 w-1/6"
        name="status"
        id="status"
        onChange={(e) => {
          const val = e.target.value;
          Action.getChangeLog(dispatch, {
            page: 0,
            startDate: items[val].value.start_date,
            endDate: items[val].value.end_date,
          });
        }}
      >
        {items.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterGoldPricing;
