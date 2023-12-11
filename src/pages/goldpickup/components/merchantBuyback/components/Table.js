import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { t } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonSort from "../../../../../components/ButtonSort/ButtonSort";
import DateUtility from "../../../../../utils/date-utility";
import GeneralUtility from "../../../../../utils/general-utility";
import Action from "../redux/Action";

const Table = ({
  search,
  postPerPage,
  startDateFilter,
  endDateFilter,
  statusFilter,
  id,
}) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.reducer.list);
  const loading = useSelector((state) => state.reducer.loading);
  const ticketList = useSelector((state) => state.reducer.ticketList);
  const idList = useSelector((state) => state.reducer.idList);
  const totalWeight = useSelector((state) => state.reducer.totalWeight);
  const totalQuantity = useSelector((state) => state.reducer.totalQuantity);
  const totalPrice = useSelector((state) => state.reducer.totalPrice);
  const fieldName = useSelector((state) => state.reducer.fieldName);
  const orderBy = useSelector((state) => state.reducer.orderBy);
  console.log(totalWeight, totalQuantity);

  if (loading) {
    return <Skeleton count={7} height="40px" />;
  }
  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-green-secondary font-semibold">
            <th className="p-2 my-2"></th>
            <th>
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
                  Action.getData(dispatch, {
                    id: id,
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
                    id: id,
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
                  Action.getData(dispatch, {
                    id: id,
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
                    id: id,
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
                  Action.getData(dispatch, {
                    id: id,
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "weight",
                    orderBy: "asc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    id: id,
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "weight",
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
                    id: id,
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
                    id: id,
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
                  Action.getData(dispatch, {
                    id: id,
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "totalPrice",
                    orderBy: "asc",
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    statusFilter: statusFilter,
                  });
                }}
                sortDesc={() => {
                  Action.getData(dispatch, {
                    id: id,
                    page: 0,
                    search: search,
                    postPerPage: postPerPage,
                    fieldName: "totalPrice",
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
        <tbody>
          {list.map((item, index) => (
            <tr
              key={index}
              className={`${
                !ticketList.includes(item.id) ? "" : "border-l-green-primary"
              } border-4 border-gray-primary bg-white`}
            >
              <td className="p-2 m-2">
                <input
                  type="checkbox"
                  name={item.id}
                  className="cursor-pointer rounded-sm checked:bg-gold-primary"
                  value={ticketList.includes(item.id)}
                  checked={ticketList.includes(item.id)}
                  onChange={(e) => {
                    let ticketListCopy = [...ticketList];
                    let idListCopy = [...idList];
                    let itemPrice = item.totalPrice;
                    if (e.target.value.toLocaleLowerCase() === "false") {
                      ticketListCopy.push(item.id);
                      idListCopy.push(item.titcketId);
                      Action.changeTicketList(dispatch, {
                        items: ticketListCopy,
                        idList: idListCopy,
                        totalWeight: totalWeight + item.totalWeight,
                        totalQuantity: totalQuantity + item.quantity,
                        totalPrice: totalPrice + itemPrice,
                      });
                    } else {
                      let removeIndex = ticketListCopy.indexOf(item.id);
                      let removeIndexId = idListCopy.indexOf(item.titcketId);
                      if (removeIndex > -1) {
                        ticketListCopy.splice(removeIndex, 1);
                        idListCopy.splice(removeIndexId, 1);
                      }
                      Action.changeTicketList(dispatch, {
                        items: ticketListCopy,
                        idList: idListCopy,
                        totalWeight: totalWeight - item.totalWeight,
                        totalQuantity: totalQuantity - item.quantity,
                        totalPrice: totalPrice - itemPrice,
                      });
                    }
                  }}
                />
              </td>
              <td className="">{item.dateCreated}</td>
              <td>{item.titcketId}</td>
              <td>{item.totalWeight} gram</td>
              <td>{item.quantity} pcs</td>
              <td>Rp {GeneralUtility.addSeparator(item.totalPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
