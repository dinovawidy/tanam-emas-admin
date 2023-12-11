import React from "react";
import { useTranslation } from "react-multi-lang";
import Action from "../redux/Action";
import { useDispatch } from "react-redux";

const HeaderTabel = ({ search, postPerPage, statusFilter }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  let filterTimeout;
  return (
    <>
      <h4 className="flex-1 opacity-60 font-bold">
        {t("helpcenter.feedback").toUpperCase()}
      </h4>
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
          placeholder={t("helpcenter.search_feedback")}
          className="pl-10 pr-3 w-full block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white  placeholder:text-slate-40 "
          onChange={(e) => {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
              Action.getList(dispatch, {
                currentPage: 0,
                search: e.target.value,
                statusFilter: statusFilter,
                postPerPage: postPerPage,
              });
            }, 200);
          }}
        />
      </label>
      <select
        className="sm:text-sm shadow-sm border border-gray-primary rounded-xl"
        name="status"
        id="status"
        onChange={(e) => {
          Action.getList(dispatch, {
            currentPage: 0,
            search: search,
            statusFilter: e.target.value,
            postPerPage: postPerPage,
          });
        }}
      >
        <option value="">{t("helpcenter.all_status")}</option>
        <option value="1">{t("helpcenter.active")}</option>
        <option value="2">{t("helpcenter.req_resolve")}</option>
        <option value="3">{t("helpcenter.resolved")}</option>
      </select>
      <div>
        <label htmlFor="postperview" className="pr-2 text-sm font-medium">
          {t("helpcenter.view")}
        </label>
        <select
          className="sm:text-sm shadow-sm border border-gray-primary rounded-xl"
          name="postperview"
          id="postperview"
          onChange={(e) => {
            Action.getList(dispatch, {
              currentPage: 1,
              search: search,
              statusFilter: statusFilter,
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
