import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch } from "react-redux";
import Action from "../redux/Action";
import { setShowDetail } from "../redux/Reducer";

const HeaderTabel = ({ search, postPerPage, statusFilter, fieldName, orderBy }) => {
  const t = useTranslation();
  let filterTimeout;
  const dispatch = useDispatch();
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-12 gap-2  items-center">
        <div className="lg:col-span-3 font-bold opacity-60 lg:text-md md:text-sm">
          {t("management.customer_list").toUpperCase()}
        </div>
        <div className="lg:col-span-5 md:col-span-4">
          <label className="relative block">
            <span className="absolute inset-y-0 left-1.5 flex items-center pl-2">
              <img
                className="h-3.5 w-5 fill-slate-300"
                src={process.env.REACT_APP_ASSETS_IMAGE + "username-icon.svg"}
                alt="username-icon"
              />
            </span>
            <input
              type="text"
              placeholder={t("management.search_customer")}
              className="pl-10 pr-3 w-full block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white  placeholder:text-slate-40"
              onChange={(e) => {
                clearTimeout(filterTimeout);
                filterTimeout = setTimeout(() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: e.target.value,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: fieldName,
                    orderBy: orderBy
                  });
                  dispatch(setShowDetail(false));
                }, 500);
              }}
            />
          </label>
        </div>
        <div className="lg:col-span-2 md:col-span-2">
          <select
            className="w-full sm:text-sm shadow-sm border border-gray-primary rounded-xl"
            name="status"
            id="status"
            onChange={(e) => {
              Action.getList(dispatch, {
                currentPage: 0,
                search: search,
                statusFilter: e.target.value,
                postPerPage: postPerPage,
                fieldName: fieldName,
                orderBy: orderBy
              });
              dispatch(setShowDetail(false));
            }}
          >
            <option value="">{t("general.all_status")}</option>
            <option value="1">{t("general.active")}</option>
            <option value="-1">{t("general.suspendend")}</option>
            <option value="-2">{t("general.is_deleted")}</option>
            <option value="0">{t("general.seq_suspend")}</option>
          </select>
        </div>
        <div className="lg:col-span-2 md:col-span-3">
          <label htmlFor="postperview" className="pr-2 text-sm font-medium">
            {t("management.view")}
          </label>
          <select
            className="sm:text-sm shadow-sm border border-gray-primary rounded-xl"
            id="postperview"
            onChange={(e) => {
              Action.getList(dispatch, {
                currentPage: 0,
                search: search,
                statusFilter: statusFilter,
                postPerPage: parseInt(e.target.value),
                fieldName: fieldName,
                orderBy: orderBy
              });
              dispatch(setShowDetail(false));
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default HeaderTabel;
