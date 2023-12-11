import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch } from "react-redux";
import Action from "../redux/Action";

const FilterDashboard = () => {
  const t = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <div className="self-center tracking-[1.27px] font-medium text-[#A7ADA9] mr-3">
        {t("general.filter").toUpperCase()}
      </div>
      <select
        className="rounded-xl p-2 w-1/6 text-sm border-gray-primary font-semibold"
        name="status"
        id="status"
        onChange={(opt) => {
          let val = parseInt(opt.target.value);
          Action.getBuyback(dispatch, val, 0);
          Action.getRevenueData(dispatch, val);
          Action.getTopSelling(dispatch, { page: 0, time: val });
          Action.getLeaderBoard(dispatch, { page: 0, time: val });
          Action.getFilter(dispatch, val);
        }}
      >
        <option value="0">This Week</option>
        <option value="1">This Month</option>
        <option value="2">This Year</option>
      </select>

    </>
  );
};

export default FilterDashboard;
