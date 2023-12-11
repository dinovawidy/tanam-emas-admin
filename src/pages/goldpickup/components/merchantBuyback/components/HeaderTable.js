import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch } from "react-redux";
import DateRangePicker from "../../../../../components/DateRangePicker/DateRangePicker";
import Action from "../redux/Action";
import { setEndDateFilter, setStartDateFilter } from "../redux/Reducer";

const HeaderTabel = ({
  search,
  postPerPage,
  statusFilter,
  startDateFilter,
  endDateFilter,
  id,
}) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  let filterTimeout;
  return (
    <>
      <h4 className="opacity-60 font-bold">
        {t("buyback.buyback_list").toUpperCase()}
      </h4>
      <label className="flex-1 min-w-fit relative block">
        <span className="absolute inset-y-0 left-1.5 flex items-center pl-2">
          <img
            className="h-3.5 w-5 fill-slate-300"
            src={process.env.REACT_APP_ASSETS_IMAGE + "username-icon.svg"}
            alt="username-icon"
          />
        </span>
        <input
          type="text"
          placeholder={t("buyback.search_buyback")}
          className="pl-10 pr-3 w-full block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white  placeholder:text-slate-40 "
          onChange={(e) => {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
              Action.getData(dispatch, {
                id: id,
                page: 0,
                search: e.target.value,
                statusFilter: statusFilter,
                postPerPage: postPerPage,
                startDateFilter: startDateFilter,
                endDateFilter: endDateFilter,
              });
            }, 500);
          }}
        />
      </label>
      <DateRangePicker
        startDateValue={startDateFilter}
        endDateValue={endDateFilter}
        onOpen={() => {
          dispatch(setStartDateFilter(""));
          dispatch(setEndDateFilter(""));
        }}
        onChange={(dateObject) => {
          var d0 = new Date(dateObject[0]);
          if (dateObject.length > 1) {
            var d1 = new Date(dateObject[1]);
            dispatch(setStartDateFilter(d0.toISOString()));
            dispatch(setEndDateFilter(d1.toISOString()));
          } else {
            dispatch(setStartDateFilter(d0.toISOString()));
            dispatch(setEndDateFilter(""));
          }
        }}
        onClose={() => {
          Action.getData(dispatch, {
            id: id,
            page: 0,
            search: search,
            statusFilter: statusFilter,
            postPerPage: postPerPage,
            startDateFilter: startDateFilter,
            endDateFilter: endDateFilter,
          });
        }}
        format="MMM DD, YYYY"
        placeholder={t("buyback.date_range_placeholder")}
        inputClass="block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white  placeholder:text-slate-40 cursor-pointer"
      />
      <div>
        <label htmlFor="postperview" className="pr-2 text-sm font-medium">
          {t("management.view")}
        </label>
        <select
          className="sm:text-sm shadow-sm border border-gray-primary rounded-xl"
          name="postperview"
          id="postperview"
          onChange={(e) => {
            Action.getData(dispatch, {
              id: id,
              page: 0,
              search: search,
              statusFilter: statusFilter,
              postPerPage: parseInt(e.target.value),
              startDateFilter: startDateFilter,
              endDateFilter: endDateFilter,
            });
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </>
  );
};

export default HeaderTabel;
