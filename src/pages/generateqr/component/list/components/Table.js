import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "react-multi-lang";
import Skeleton from "react-loading-skeleton";
import Action from "../redux/Action";
import "react-loading-skeleton/dist/skeleton.css";
import ButtonSort from "../../../../../components/ButtonSort/ButtonSort";

const Tabel = ({ search, postPerPage }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.reducer.list);
  const loading = useSelector((state) => state.reducer.loading);
  const itemDetail = useSelector((state) => state.reducer.itemDetail);
  const fieldName = useSelector((state) => state.reducer.fieldName);
  const orderBy = useSelector((state) => state.reducer.orderBy);

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
                title={t("generateqr.serial_number")}
                isAsc={
                  fieldName === "serialNumber"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "serialNumber"
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
                    fieldName: "serialNumber",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "serialNumber",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("generateqr.product_name")}
                isAsc={
                  fieldName === "productName"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "productName"
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
                    fieldName: "productName",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "productName",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>{t("generateqr.fineness")}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr
              key={index}
              className={`${
                itemDetail.serialNumber !== item.serialNumber ? "" : "border-l-green-primary"
              } border-4 border-gray-primary bg-white cursor-pointer font-semibold`}
              onClick={() => {
                if (itemDetail.id !== item.id) {
                  Action.changeShowDetail(dispatch, true, item.serialNumber);
                } else {
                  Action.changeShowDetail(dispatch, false);
                }
              }}
            >
              <td className="p-2 my-2">{item.serialNumber}</td>
              <td>{item.productName}</td>
              <td>{item.fineness}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabel;
