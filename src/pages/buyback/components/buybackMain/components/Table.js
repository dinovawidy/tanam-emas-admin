import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { t } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonSort from "../../../../../components/ButtonSort/ButtonSort";
import GeneralUtility from "../../../../../utils/general-utility";
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
  return (<span style={customStyle}></span>);
};

const Tabel = ({
  search,
  postPerPage,
  statusFilter,
  startDateFilter,
  endDateFilter,
}) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.reducer.list);
  const loading = useSelector((state) => state.reducer.loading);
  const itemDetail = useSelector((state) => state.reducer.itemDetail);
  const fieldName = useSelector((state) => state.reducer.fieldName);
  const orderBy = useSelector((state) => state.reducer.orderBy);
  const customStyles = {
    transform: "scale(1.02)",
    boxShadow: "0px 15px 23px -8px rgba(0,0,0,0.1)"
  };

  const enumStatus = Object.freeze({
    "-2": "Revise",
    "-1": "Cancelled",
    0: "Requested",
    1: "Accepted",
    2: "Completed",
    3: "Confirmed (Revise)",
    4: "Declined",
    5: "Completed",
  });

  if (loading) {
    return <Skeleton count={7} height="40px" />;
  }
  return (
    <>
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="text-green-secondary font-semibold">
            <th className="p-2 my-2">
              <ButtonSort
                title={t("buyback.date_created")}
                isAsc={
                  fieldName === "dateCreated"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "dateCreated"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    fieldName: "dateCreated",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    fieldName: "dateCreated",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th className="p-2">
              {t("buyback.buyback_category")}
            </th>
            <th>
              <ButtonSort
                title={t("buyback.ticket_id")}
                isAsc={
                  fieldName === "titckeId"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "titckeId"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    fieldName: "titckeId",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    fieldName: "titckeId",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th className="p-2">
              <ButtonSort
                title={t("management.customer_name")}
                isAsc={
                  fieldName === "customerName"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "customerName"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    fieldName: "customerName",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    fieldName: "customerName",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("buyback.total_weight")}
                isAsc={
                  fieldName === "weight"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "weight"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    fieldName: "weight",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    fieldName: "weight",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            {/* <th>
              <ButtonSort
                title={t("buyback.total_price")}
                isAsc={
                  fieldName === "totalPrice"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "totalPrice"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    fieldName: "totalPrice",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    fieldName: "totalPrice",
                    orderBy: "desc",
                  });
                }}
              />
            </th> */}
            <th>{t("management.status")}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr
              key={index}
              className={`border-4 border-gray-primary bg-white cursor-pointer`}
              style={itemDetail.id === item.id ? customStyles : {}}
              onClick={() => {
                if (itemDetail.id !== item.id) {
                  Action.changeShowDetail(dispatch, true, item.id);
                } else {
                  Action.changeShowDetail(dispatch, false);
                }
              }}
            >
              <td className="p-2 my-2 relative">
                {itemDetail.id === item.id ? <BorderCustom /> : ""}
                <span className="block ml-2">{item.date_created}</span>
              </td>
              <td className="p-2 my-2">{item.category}</td>
              <td>{item.ticket_id}</td>
              <td className="p-2">{item.customer_name}</td>
              <td>{item.weight}</td>
              {/* <td className="font-semibold">
                Rp {GeneralUtility.addSeparator(item.total_price)}
              </td> */}
              <td>{enumStatus[item.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabel;
