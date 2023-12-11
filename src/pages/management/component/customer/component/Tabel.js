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
  return (<span style={customStyle}></span>);
};

const Tabel = ({ list, loading, search, postPerPage, statusFilter }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const fieldName = useSelector((state) => state.reducer.fieldName);
  const orderBy = useSelector((state) => state.reducer.orderBy);
  const itemDetail = useSelector((state) => state.reducer.itemDetail);
  const customStyles = {
    transform: "scale(1.02)",
    boxShadow: "0px 15px 23px -8px rgba(0,0,0,0.1)"
  };

  const enumStatus = Object.freeze({
    "-2": t("management.is_deleted"),
    "-1": t("management.suspended"),
    0: t("management.req_suspended"),
    1: t("management.active"),
  });

  if (loading) {
    return <Skeleton count={5} height="40px" />;
  }
  return (
    <>
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="text-green-secondary font-semibold">
            <th className="p-2 my-2">
              <ButtonSort
                title={t("management.customer_id")}
                isAsc={
                  fieldName === "customerId"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "customerId"
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
                    fieldName: "customerId",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "customerId",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>
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
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "customerName",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "customerName",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("management.email")}
                isAsc={
                  fieldName === "email"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "email"
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
                    fieldName: "email",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "email",
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
              style={itemDetail.customerId === item.id ? customStyles : {}}
              onClick={() => {
                if (itemDetail.customerId !== item.id) {
                  Action.changeShowDetail(dispatch, true, item.id);
                } else {
                  Action.changeShowDetail(dispatch, false);
                }
              }}
            >
              <td className="p-2 my-2 relative" width={300}>
                {itemDetail.customerId === item.id ? <BorderCustom /> : ""}
                <span className="block ml-2">{item.id}</span>
              </td>
              <td className="font-semibold">{item.name}</td>
              <td>{item.email}</td>
              <td width={150}>{enumStatus[item.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabel;
