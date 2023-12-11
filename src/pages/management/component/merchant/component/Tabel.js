import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-multi-lang";
import ButtonSort from "../../../../../components/ButtonSort/ButtonSort";
import Action from "../redux/Action";

const BorderCustom = () => {
  const customStyle = {
    top: "0px",
    left: "0px",
    width: "5px",
    background: "#144632",
    height: "100%",
    position: "absolute",
  };
  return <span style={customStyle}></span>;
};

const Tabel = ({ search, postPerPage, statusFilter }) => {
  const t = useTranslation();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.reducer.list);
  const loading = useSelector((state) => state.reducer.loading);
  const detailMerchant = useSelector((state) => state.reducer.detailMerchant);
  const fieldName = useSelector((state) => state.reducer.fieldName);
  const orderBy = useSelector((state) => state.reducer.orderBy);
  const customStyles = {
    transform: "scale(1.02)",
    boxShadow: "0px 15px 23px -8px rgba(0,0,0,0.1)",
  };

  const enumStatus = Object.freeze({
    "-3": t("management.status_off"),
    "-2": t("management.decline"),
    "-1": t("management.suspended"),
    0: t("management.req_suspended"),
    1: t("management.active"),
    2: t("management.submited"),
    3: t("management.req_approve"),
    4: t("management.approve"),
  });

  if (loading) {
    return <Skeleton count={7} height="40px" />;
  }

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr className="text-green-secondary font-semibold">
          <th className="p-2 my-2">
            <ButtonSort
              title={t("management.merchant_id")}
              isAsc={
                fieldName === "merchantId"
                  ? orderBy === "asc"
                    ? true
                    : false
                  : false
              }
              isDesc={
                fieldName === "merchantId"
                  ? orderBy === "desc"
                    ? true
                    : false
                  : false
              }
              sortAsc={() => {
                Action.getList(dispatch, {
                  currentPage: 0,
                  search: search,
                  statusFilter: statusFilter,
                  postPerPage: postPerPage,
                  fieldName: "merchantId",
                  orderBy: "asc",
                });
              }}
              sortDesc={() => {
                Action.getList(dispatch, {
                  currentPage: 0,
                  search: search,
                  statusFilter: statusFilter,
                  postPerPage: postPerPage,
                  fieldName: "merchantId",
                  orderBy: "desc",
                });
              }}
            />
          </th>
          <th>
            <ButtonSort
              title={t("management.merchant_name")}
              isAsc={
                fieldName === "merchantName"
                  ? orderBy === "asc"
                    ? true
                    : false
                  : false
              }
              isDesc={
                fieldName === "merchantName"
                  ? orderBy === "desc"
                    ? true
                    : false
                  : false
              }
              sortAsc={() => {
                Action.getList(dispatch, {
                  currentPage: 0,
                  search: search,
                  statusFilter: statusFilter,
                  postPerPage: postPerPage,
                  fieldName: "merchantName",
                  orderBy: "asc",
                });
              }}
              sortDesc={() => {
                Action.getList(dispatch, {
                  currentPage: 0,
                  search: search,
                  statusFilter: statusFilter,
                  postPerPage: postPerPage,
                  fieldName: "merchantName",
                  orderBy: "desc",
                });
              }}
            />
          </th>
          <th>
            <ButtonSort
              title={t("management.location")}
              isAsc={
                fieldName === "location"
                  ? orderBy === "asc"
                    ? true
                    : false
                  : false
              }
              isDesc={
                fieldName === "location"
                  ? orderBy === "desc"
                    ? true
                    : false
                  : false
              }
              sortAsc={() => {
                Action.getList(dispatch, {
                  currentPage: 0,
                  search: search,
                  statusFilter: statusFilter,
                  postPerPage: postPerPage,
                  fieldName: "location",
                  orderBy: "asc",
                });
              }}
              sortDesc={() => {
                Action.getList(dispatch, {
                  currentPage: 0,
                  search: search,
                  statusFilter: statusFilter,
                  postPerPage: postPerPage,
                  fieldName: "location",
                  orderBy: "desc",
                });
              }}
            />
          </th>
          <th>
            <ButtonSort
              title={t("management.rating")}
              isAsc={
                fieldName === "rating"
                  ? orderBy === "asc"
                    ? true
                    : false
                  : false
              }
              isDesc={
                fieldName === "rating"
                  ? orderBy === "desc"
                    ? true
                    : false
                  : false
              }
              sortAsc={() => {
                Action.getList(dispatch, {
                  currentPage: 0,
                  search: search,
                  statusFilter: statusFilter,
                  postPerPage: postPerPage,
                  fieldName: "rating",
                  orderBy: "asc",
                });
              }}
              sortDesc={() => {
                Action.getList(dispatch, {
                  currentPage: 0,
                  search: search,
                  statusFilter: statusFilter,
                  postPerPage: postPerPage,
                  fieldName: "rating",
                  orderBy: "desc",
                });
              }}
            />
          </th>
          <th>
            <ButtonSort
              title={t("management.status")}
              isAsc={
                fieldName === "status"
                  ? orderBy === "asc"
                    ? true
                    : false
                  : false
              }
              isDesc={
                fieldName === "status"
                  ? orderBy === "desc"
                    ? true
                    : false
                  : false
              }
              sortAsc={() => {
                Action.getList(dispatch, {
                  currentPage: 0,
                  search: search,
                  statusFilter: statusFilter,
                  postPerPage: postPerPage,
                  fieldName: "status",
                  orderBy: "asc",
                });
              }}
              sortDesc={() => {
                Action.getList(dispatch, {
                  currentPage: 0,
                  search: search,
                  statusFilter: statusFilter,
                  postPerPage: postPerPage,
                  fieldName: "status",
                  orderBy: "desc",
                });
              }}
            />
          </th>
        </tr>
      </thead>
      <tbody className="font-medium">
        {list.map((item, index) => (
          <tr
            key={index}
            className={`border-4 border-gray-primary bg-white cursor-pointer`}
            style={detailMerchant.id === item.merchantId ? customStyles : {}}
            onClick={() => {
              if (detailMerchant.id !== item.id) {
                Action.changeShowDetail(dispatch, true, item.id);
              } else {
                Action.changeShowDetail(dispatch, false);
              }
            }}
          >
            <td className="p-2 my-2 relative">
              {detailMerchant.id === item.merchantId ? <BorderCustom /> : ""}
              <span className="block ml-2">{item.merchantId}</span>
            </td>
            <td className="font-semibold">{item.name}</td>
            <td>{item.location}</td>
            <td>
              <div className="flex items-center">
                <img src={process.env.REACT_APP_ASSETS_IMAGE + "star-ratings.svg"} alt="star ratings" />
                <span className="block ml-1 -mb-0.5">{item.rating}</span>
              </div>
            </td>
            <td>{enumStatus[item.status]}</td>
            <td className="p-2">
              {item.buyback === true && item.status === 1 ? (
                <img
                  className="w-4 h-4"
                  src={
                    process.env.REACT_APP_ASSETS_IMAGE +
                    "buyback-icon-active.svg"
                  }
                  alt="buyback"
                />
              ) : (
                ""
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabel;
