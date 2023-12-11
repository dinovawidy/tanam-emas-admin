import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-multi-lang";
import Action from "../redux/Action";
import ButtonSort from "../../../../../components/ButtonSort/ButtonSort";

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

const Tabel = ({ search, postPerPage, statusFilter }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.reducer.list);
  const loading = useSelector((state) => state.reducer.loading);
  const showDetail = useSelector((state) => state.reducer.showDetail);
  const detailAdmin = useSelector((state) => state.reducer.detailAdmin);
  const fieldName = useSelector((state) => state.reducer.fieldName);
  const orderBy = useSelector((state) => state.reducer.orderBy);
  const customStyles = {
    transform: "scale(1.02)",
    boxShadow: "0px 15px 23px -8px rgba(0,0,0,0.1)"
  };

  if (loading) {
    return <Skeleton count={7} height="40px" />;
  }

  const enumStatus = Object.freeze({
    "-1": t("management.terminated"),
    0: t("management.inactive"),
    1: t("management.active"),
  });
  return (
    <>
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="text-green-secondary font-semibold">
            <th className="p-2 my-2">
              <ButtonSort
                title={t("management.admin_id")}
                isAsc={
                  fieldName === "adminId"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "adminId"
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
                    fieldName: "adminId",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "adminId",
                    orderBy: "desc",
                  });
                }}
              />
            </th>

            <th>
              <ButtonSort
                title={t("management.admin_name")}
                isAsc={
                  fieldName === "adminName"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "adminName"
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
                    fieldName: "adminName",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "adminName",
                    orderBy: "desc",
                  });
                }}
              />
            </th>

            <th>
              <ButtonSort
                title={t("management.level")}
                isAsc={
                  fieldName === "level"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "level"
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
                    fieldName: "level",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "level",
                    orderBy: "desc",
                  });
                }}
              />
            </th>

            <th>
              <ButtonSort
                title={t("management.role")}
                isAsc={
                  fieldName === "role"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "role"
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
                    fieldName: "role",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "role",
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
              style={detailAdmin.id === item.id ? customStyles : {}}
              onClick={() => {
                if (detailAdmin.id !== item.id) {
                  Action.changeShowDetail(dispatch, true, item.id);
                } else {
                  Action.changeShowDetail(dispatch, false);
                }
              }}
            >
              <td className="p-2 my-2 relative">
                {detailAdmin.id === item.id ? <BorderCustom /> : ""}
                <span className="block ml-2">{item.adminId}</span>
              </td>
              <td className="font-semibold">{item.name}</td>
              <td>{item.level}</td>
              <td>{item.role}</td>
              <td>{enumStatus[item.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabel;
