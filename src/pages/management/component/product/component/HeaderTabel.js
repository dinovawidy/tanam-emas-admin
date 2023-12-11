import Action from "../redux/Action";
import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch } from "react-redux";
import {
  setStartDateFilter,
  setEndDateFilter,
  setShowDetail,
  setDetailProduct,
} from "../redux/Reducer";
import DateRangePicker from "../../../../../components/DateRangePicker/DateRangePicker";
import { useState, useRef } from "react";
const HeaderTabel = ({
  search,
  postPerPage,
  statusFilter,
  startDateFilter,
  endDateFilter,
  categoryId,
  fieldName,
  orderBy
}) => {
  const dispatch = useDispatch();
  const t = useTranslation();
  let filterTimeout;

  // const [selected, setSelected] = useState([]);
  // const [filter, setFilter] = useState("");
  const [isActive, setActive] = useState(false);
  const [goldBarChecked, setGoldBarChecked] = useState(false);
  const [jewelryChecked, setJewelryChecked] = useState(false);
  const [status, setStatus] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  const handleOpenStatus = () => {
    setActive(!isActive);
  };

  const handleChangeStatus = (e) => {
    const { value, checked } = e.target;
    setStatus(value);

    if (checked) {
      setStatus(value);
    } else {
      setStatus("");
    }

    Action.getList(dispatch, {
      currentPage: 0,
      search: search,
      statusFilter: checked ? value : "",
      postPerPage: postPerPage,
      startDateFilter: startDateFilter,
      endDateFilter: endDateFilter,
      categoryId: categoryId,
      fieldName: fieldName,
      orderBy: orderBy
    });
    dispatch(setShowDetail(false));
    dispatch(setDetailProduct({}));
  };

  const handleGoldBarChange = () => {
    setGoldBarChecked(!goldBarChecked);
    setJewelryChecked(false);

    if (!goldBarChecked) {
      Action.getList(dispatch, {
        currentPage: 0,
        search: search,
        statusFilter: statusFilter,
        postPerPage: postPerPage,
        startDateFilter: startDateFilter,
        endDateFilter: endDateFilter,
        categoryId: goldBarChecked
          ? ""
          : "25d3b78a-e7a0-46de-9221-7eb31d5b39b4",
        fieldName: fieldName,
        orderBy: orderBy
      });
    } else {
      Action.getList(dispatch, {
        currentPage: 0,
        search: search,
        statusFilter: statusFilter,
        postPerPage: postPerPage,
        startDateFilter: startDateFilter,
        endDateFilter: endDateFilter,
        categoryId: "",
        fieldName: fieldName,
        orderBy: orderBy
      });
    }
  };

  const handleJewelryChange = () => {
    setJewelryChecked(!jewelryChecked);
    setGoldBarChecked(false);

    if (!jewelryChecked) {
      Action.getList(dispatch, {
        currentPage: 0,
        search: search,
        statusFilter: statusFilter,
        postPerPage: postPerPage,
        startDateFilter: startDateFilter,
        endDateFilter: endDateFilter,
        categoryId: jewelryChecked
          ? ""
          : "60d13be0-126a-4fbc-b6eb-89b2d476cdf5",
        fieldName: fieldName,
        orderBy: orderBy
      });
    } else {
      Action.getList(dispatch, {
        currentPage: 0,
        search: search,
        statusFilter: statusFilter,
        postPerPage: postPerPage,
        startDateFilter: startDateFilter,
        endDateFilter: endDateFilter,
        categoryId: "",
        fieldName: fieldName,
        orderBy: orderBy
      });
    }
  };

  const enumStatus = Object.freeze({
    "-2": t("management.take_down"),
    "-1": t("management.req_take_down"),
    0: t("management.inactive"),
    1: t("management.active"),
    2: t("management.mark_as_checked"),
  });

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-12 gap-2 items-center">
        <div className="lg:col-span-2 font-bold opacity-60 lg:text-md md:text-sm">
          {t("management.product_list").toUpperCase()}
        </div>
        <div className="lg:col-span-4 md:col-span-4">
          <label className="min-w-fit relative block">
            <span className="absolute inset-y-0 left-1.5 flex items-center pl-2">
              <img
                className="h-3.5 w-5 fill-slate-300"
                src={process.env.REACT_APP_ASSETS_IMAGE + "username-icon.svg"}
                alt="username-icon"
              />
            </span>
            <input
              type="text"
              placeholder={t("management.search_product")}
              className="pl-10 pr-3 w-full block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white  placeholder:text-slate-40 "
              onChange={(e) => {
                clearTimeout(filterTimeout);
                filterTimeout = setTimeout(() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: e.target.value,
                    postPerPage: postPerPage,
                    statusFilter: statusFilter,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    categoryId: categoryId,
                    fieldName: fieldName,
                    orderBy: orderBy
                  });
                  dispatch(setShowDetail(false));
                  dispatch(setDetailProduct({}));
                }, 200);
              }}
            />
          </label>
        </div>
        <div className="lg:col-span-2 md:col-span-2">
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
              Action.getList(dispatch, {
                currentPage: 0,
                search: search,
                statusFilter: statusFilter,
                postPerPage: postPerPage,
                startDateFilter: startDateFilter,
                endDateFilter: endDateFilter,
                categoryId: categoryId,
                fieldName: fieldName,
                orderBy: orderBy
              });
              dispatch(setShowDetail(false));
              dispatch(setDetailProduct({}));
            }}
            format="MMM DD, YYYY"
            placeholder={t("buyback.date_range_placeholder")}
            inputClass="w-full block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white  placeholder:text-slate-40 cursor-pointer"
          />
        </div>
        <div className="lg:col-span-2 md:col-span-3 relative" ref={dropdownRef}>
          <div
            className="bg-white rounded-xl p-3 flex items-center justify-between cursor-pointer"
            onClick={handleOpenStatus}
          >
            <span className="block mr-2">{t("management.select_status")}</span>
            <img
              className={`h-2 w-2.5 opacity-50 transition-all duration-300 ease-in-out
             ${isActive ? "rotate-180" : "rotate-0"}
             `}
              src="/assets/images/arrow-table.svg"
              alt="arrow-icon"
            />
          </div>

          <div
            className={`absolute left-0 bg-white rounded-xl w-[150px] z-50 shadow-sm transition-all duration-500 ease-in-out
          ${isActive ? "opacity-100" : "opacity-0"}
          ${isActive ? "top-[55px]" : "top-0"}
          ${isActive ? "visible" : "invisible"}
          `}
          >
            <span className="block text-sm font-medium mb-2 px-2 pt-2">
              {t("management.prod_category")}
            </span>
            <div className="flex items-center mb-2 px-2">
              <input
                id="goldbar_checkbox"
                type="checkbox"
                checked={goldBarChecked}
                onChange={handleGoldBarChange}
                className="w-4 h-4 text-gold-secondary bg-gray-100 border-gray-300 rounded focus:ring-gold-secondary focus:ring-2"
              />
              <label
                htmlFor="goldbar_checkbox"
                className="ml-2 text-sm font-medium"
              >
                {t("management.gold_bar")}
              </label>
            </div>
            <div className="flex items-center px-2">
              <input
                id="jewelry_checkbox"
                type="checkbox"
                checked={jewelryChecked}
                onChange={handleJewelryChange}
                className="w-4 h-4 text-gold-secondary bg-gray-100 border-gray-300 rounded focus:ring-gold-secondary focus:ring-2"
              />
              <label
                htmlFor="jewelry_checkbox"
                className="ml-2 text-sm font-medium"
              >
                {t("management.jewellery")}
              </label>
            </div>

            <hr className="my-3" />
            <span className="block text-sm font-medium mb-2 px-2 ">{t("management.status")}</span>
            <div className="flex items-center mb-2 px-2">
              <input
                id="checked_checkbox"
                type="checkbox"
                value="2"
                checked={status === "2"}
                onChange={(e) => handleChangeStatus(e)}
                className="w-4 h-4 text-gold-secondary bg-gray-100 border-gray-300 rounded focus:ring-gold-secondary focus:ring-2"
              />
              <label
                htmlFor="checked_checkbox"
                className="ml-2 text-sm font-medium"
              >
                {t("management.checked")}
              </label>
            </div>
            <div className="flex items-center mb-2 px-2">
              <input
                id="active_checkbox"
                type="checkbox"
                value="1"
                checked={status === "1"}
                onChange={(e) => handleChangeStatus(e)}
                className="w-4 h-4 text-gold-secondary bg-gray-100 border-gray-300 rounded focus:ring-gold-secondary focus:ring-2"
              />
              <label
                htmlFor="active_checkbox"
                className="ml-2 text-sm font-medium"
              >
                {t("management.active")}
              </label>
            </div>
            {/* <div className="flex items-center mb-2 px-2">
              <input
                id="inactive_checkbox"
                type="checkbox"
                value="0"
                checked={status === "0"}
                onChange={(e) => handleChangeStatus(e)}
                className="w-4 h-4 text-gold-secondary bg-gray-100 border-gray-300 rounded focus:ring-gold-secondary focus:ring-2"
              />
              <label
                htmlFor="inactive_checkbox"
                className="ml-2 text-sm font-medium"
              >
                Inactive
              </label>
            </div> */}
            <div className="flex items-center mb-2 px-2">
              <input
                id="takedown_checkbox"
                type="checkbox"
                value="-2"
                checked={status === "-2"}
                onChange={(e) => handleChangeStatus(e)}
                className="w-4 h-4 text-gold-secondary bg-gray-100 border-gray-300 rounded focus:ring-gold-secondary focus:ring-2"
              />
              <label
                htmlFor="takedown_checkbox"
                className="ml-2 text-sm font-medium"
              >
                {t("management.take_down")}
              </label>
            </div>
            <div className="flex items-center px-2 pb-2">
              <input
                id="req_tk_checkbox"
                type="checkbox"
                value="-1"
                checked={status === "-1"}
                onChange={(e) => handleChangeStatus(e)}
                className="w-4 h-4 text-gold-secondary bg-gray-100 border-gray-300 rounded focus:ring-gold-secondary focus:ring-2"
              />
              <label
                htmlFor="req_tk_checkbox"
                className="ml-2 text-sm font-medium"
              >
                {t("management.req_take_down")}
              </label>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 md:col-span-5">
          <label htmlFor="postperview" className="pr-2 text-sm font-medium">
            {t("management.view")}
          </label>
          <select
            className="sm:text-sm shadow-sm border border-gray-primary rounded-xl"
            name="postperview"
            id="postperview"
            onChange={(e) => {
              Action.getList(dispatch, {
                currentPage: 0,
                search: search,
                statusFilter: statusFilter,
                postPerPage: parseInt(e.target.value),
                startDateFilter: startDateFilter,
                endDateFilter: endDateFilter,
                fieldName: fieldName,
                orderBy: orderBy
              });
              dispatch(setShowDetail(false));
              dispatch(setDetailProduct({}));
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
