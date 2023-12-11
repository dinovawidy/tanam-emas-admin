import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-multi-lang";
import ButtonSort from "../../../../../components/ButtonSort/ButtonSort";
import Action from "../redux/Action";

const Tabel = ({ search, postPerPage }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.reducer.list);
  const detailMerchant = useSelector((state) => state.reducer.detailMerchant);
  const showDetail = useSelector((state) => state.reducer.showDetail);
  const fieldName = useSelector((state) => state.reducer.fieldName);
  const orderBy = useSelector((state) => state.reducer.orderBy);
  const loading = useSelector((state) => state.reducer.loading);
  const statusCustomer = {
    1: "Active",
  };

  const enumStatus = Object.freeze({
    1: t("helpcenter.active"),
    2: t("helpcenter.req_resolve"),
    3: t("helpcenter.resolved"),
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
                title={t("helpcenter.issued_date")}
                isAsc={
                  fieldName === "issuedDate"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "issuedDate"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "issuedDate",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "issuedDate",
                    orderBy: "desc",
                  });
                }}
              />
            </th>

            <th>
              <ButtonSort
                title={t("helpcenter.feedback_id")}
                isAsc={
                  fieldName === "feedbackId"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "feedbackId"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "feedbackId",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "feedbackId",
                    orderBy: "desc",
                  });
                }}
              />
            </th>

            <th>
              <ButtonSort
                title={t("helpcenter.category")}
                isAsc={
                  fieldName === "category"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "category"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "category",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "category",
                    orderBy: "desc",
                  });
                }}
              />
            </th>

            <th>
              <ButtonSort
                title={t("helpcenter.topic")}
                isAsc={
                  fieldName === "topic"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "topic"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "topic",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "topic",
                    orderBy: "desc",
                  });
                }}
              />
            </th>

            <th>
              <ButtonSort
                title={t("helpcenter.status")}
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
                    currentPage: 1,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "status",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
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
              className={`${
                detailMerchant.id !== item.id ? "" : " border-l-green-primary"
              }
            border-4 border-gray-primary bg-white cursor-pointer`}
              onClick={() => {
                if (detailMerchant.id !== item.id) {
                  Action.changeShowDetail(dispatch, true, item.id);
                } else {
                  Action.changeShowDetail(dispatch, false);
                }
                //onClick(dispatch, !showDetail);
              }}
            >
              <td className="p-2 my-2">{item.issuedDate}</td>
              <td className="font-semibold">{item.feedbackId}</td>
              <td>{item.category}</td>
              <td>{item.topic}</td>
              <td>{enumStatus[item.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabel;
