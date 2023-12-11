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



const Tabel = ({ list, loading, onClick, search, postPerPage }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const detailMerchant = useSelector((state) => state.reducer.detailMerchant);
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
    "-3": t("management.status_off"),
    "-2": t("management.decline"),
    "-1": t("management.suspended"),
    0: t("management.req_suspended"),
    1: t("management.active"),
    2: t("management.submited"),
    3: t("management.req_approve"),
    4: t("management.approval"),
  });

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-green-secondary font-semibold">
            <th className="py-2 my-2">
              <ButtonSort
                title={t("management.request.merchant_name")}
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
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "merchantName",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "merchantName",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("management.request.city")}
                isAsc={
                  fieldName === "city"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "city"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "city",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "city",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("management.request.province")}
                isAsc={
                  fieldName === "province"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "province"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "province",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "province",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("management.request.req_date")}
                isAsc={
                  fieldName === "reqDate"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "reqDate"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "reqDate",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "reqDate",
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
              className={`bg-white border-4 border-gray-primary cursor-pointer`}
              onClick={() => {
                if (detailMerchant.id === item.id) {
                  onClick(dispatch, false);
                  Action.getDetailMerchant(dispatch, {});
                } else {
                  onClick(dispatch, true);
                  Action.getDetailMerchant(dispatch, item);
                }
              }}
              style={detailMerchant.id === item.id ? customStyles : {}}
            >
              <td className="p-2 my-2 relative">
                {detailMerchant.id === item.id ? <BorderCustom /> : ""}
                <span className="block ml-2">{item.merchantName}</span>
              </td>
              <td>{item.cities_name}</td>
              <td>{item.provinces_name}</td>
              <td>{item.reqDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabel;
