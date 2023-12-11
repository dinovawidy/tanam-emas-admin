import React, { useState } from "react";
import { t } from "react-multi-lang";
import Action from "../redux/Action";
import PopupAddItem from "./PopupAddItem";

const Tabel = ({ getTotalProduct, getTotalQuantity, list, setList }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="text-green-secondary font-semibold">
            <th className="p-2 my-2">
              {t("generateqr.product_name")}
              {/* <ButtonSort
                title={t("generateqr.product_name")}
                isAsc={
                  fieldName === "brandName"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "brandName"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.sortList(
                    "brandName",
                    "asc",
                    list,
                    setList,
                    setFieldName,
                    setOrderBy
                  );
                }}
                sortDesc={() => {
                  Action.sortList(
                    "brandName",
                    "desc",
                    list,
                    setList,
                    setFieldName,
                    setOrderBy
                  );
                }}
              /> */}
            </th>
            <th>
              {t("generateqr.quantity")}
              {/* <ButtonSort
                title={t("generateqr.quantity")}
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
                  Action.sortList(
                    "quantity",
                    "asc",
                    list,
                    setList,
                    setFieldName,
                    setOrderBy
                  );
                }}
                sortDesc={() => {
                  Action.sortList(
                    "quantity",
                    "desc",
                    list,
                    setList,
                    setFieldName,
                    setOrderBy
                  );
                }}
              /> */}
            </th>
            <th>{t("generateqr.fineness")}</th>
            <th>{t("general.action")}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr
              key={index}
              className="border-4 border-gray-primary bg-white cursor-pointer font-semibold"
            >
              <td className="p-2 my-2">
                {item.brandName +
                  (item.edition !== "" ? " - " + item.edition : "") +
                  ", " +
                  item.gramName}
              </td>
              <td>{item.quantity}</td>
              <td>{item.fineness}</td>
              <td
                className="text-red-500"
                onClick={() => {
                  Action.delItem(item.id, list, setList);
                  getTotalProduct(-1);
                  getTotalQuantity(0 - item.quantity);
                }}
              >
                DELETE
              </td>
            </tr>
          ))}
          <tr className="border-4 border-gray-primary bg-white cursor-pointer">
            <td
              className="p-2 my-2 font-semibold text-green-quaternary"
              colSpan={5}
              onClick={() => {
                setShow(true);
              }}
            >
              + {t("generateqr.new_item").toUpperCase()}
            </td>
          </tr>
        </tbody>
      </table>

      {show ? (
        <PopupAddItem
          addList={(value) => {
            Action.addList(value, list, setList);
            getTotalProduct(1);
            getTotalQuantity(parseInt(value.quantity));
          }}
          onCancel={() => {
            setShow(false);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Tabel;
