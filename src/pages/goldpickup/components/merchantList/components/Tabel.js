import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonSort from "../../../../../components/ButtonSort/ButtonSort";
import Action from "../redux/Action";

const Tabel = ({ list, loading, onClick, search, postPerPage }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
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
                title={t("management.merchant_name")}
                isAsc={
                  fieldName === "name"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "name"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "name",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "name",
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
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "location",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "location",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("buyback.quantity")}
                isAsc={
                  fieldName === "qtyTotal"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "qtyTotal"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "qtyTotal",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "qtyTotal",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("buyback.total_weight")}
                isAsc={
                  fieldName === "weightTotal"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "weightTotal"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "weightTotal",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "weightTotal",
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
              className="bg-white border-4 border-gray-primary cursor-pointer"
              onClick={() => {
                onClick(item);
              }}
            >
              <td className="p-2 my-2 font-semibold">{item.name}</td>
              <td>{item.location}</td>
              <td>{item.quantity} pcs</td>
              <td>{item.totalWeight} gram</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabel;
