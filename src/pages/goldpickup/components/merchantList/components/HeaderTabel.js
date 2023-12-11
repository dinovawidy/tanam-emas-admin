import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch } from "react-redux";
import Action from "../redux/Action";

const HeaderTabel = ({ search, postPerPage }) => {
  const t = useTranslation();
  let filterTimeout;
  const dispatch = useDispatch();
  return (
    <>
      <h4 className="opacity-60 font-bold">
        {t("management.merchant_list").toUpperCase()}
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
          placeholder={t("management.search_merchant")}
          className="pl-10 pr-3 w-full block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white placeholder:text-slate-40 "
          onChange={(e) => {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
              Action.getData(dispatch, {
                page: 0,
                search: e.target.value,
                postPerPage: postPerPage,
              });
            }, 500);
          }}
        />
      </label>
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
              page: 0,
              search: search,
              postPerPage: parseInt(e.target.value),
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
