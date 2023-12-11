import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonSort from "../../../../../components/ButtonSort/ButtonSort";
import DateUtility from "../../../../../utils/date-utility";
import Action from "../redux/Action";

const Tabel = ({
  search,
  postPerPage,
  startDateFilter,
  endDateFilter,
  statusFilter,
}) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.reducer.list);
  const loading = useSelector((state) => state.reducer.loading);
  const itemDetail = useSelector((state) => state.reducer.itemDetail);
  const fieldName = useSelector((state) => state.reducer.fieldName);
  const orderBy = useSelector((state) => state.reducer.orderBy);

  const statusPickup = Object.freeze({
    1: "Third Party Courier",
    2: "Self Pickup",
  });

  const statusGoldPickup = Object.freeze({
    "-3": "Issued",
    "-2": "Not Match",
    "-1": "Declined",
    0: "Accepted",
    1: "Picked up by Courier",
    2: "Received",
    3: "Finished",
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
                title={t("goldpickup.pickup_date")}
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
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "dateCreated",
                    orderBy: "asc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "dateCreated",
                    orderBy: "desc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("goldpickup.pickup_ticket_id")}
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
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "titckeId",
                    orderBy: "asc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "titckeId",
                    orderBy: "desc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
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
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "merchantName",
                    orderBy: "asc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "merchantName",
                    orderBy: "desc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("buyback.quantity")}
                isAsc={
                  fieldName === "quantity"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "quantity"
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
                    fieldName: "quantity",
                    orderBy: "asc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "quantity",
                    orderBy: "desc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("goldpickup.pickup_method")}
                isAsc={
                  fieldName === "pickupMethod"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "pickupMethod"
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
                    fieldName: "pickupMethod",
                    orderBy: "asc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "pickupMethod",
                    orderBy: "desc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("buyback.status")}
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
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "status",
                    orderBy: "asc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "status",
                    orderBy: "desc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
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
                itemDetail.id !== item.id ? "" : "border-l-green-primary"
              } border-4 border-gray-primary bg-white cursor-pointer`}
              onClick={() => {
                if (itemDetail.id !== item.id) {
                  Action.changeShowDetail(dispatch, true, item.id);
                } else {
                  Action.changeShowDetail(dispatch, false);
                }
              }}
            >
              <td className="p-2 my-2">
                {DateUtility.formatDate(item.pickupDate, "half")}
              </td>
              <td>{item.ticketId}</td>
              <td className="font-semibold">{item.name}</td>
              <td>{item.quantity} pcs</td>
              <td>{statusPickup[item.pickupMethod]}</td>
              <td>{statusGoldPickup[item.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabel;
