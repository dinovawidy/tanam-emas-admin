import React, { useState, useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import ButtonSort from "../../../../../components/ButtonSort/ButtonSort";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ManagementCustomerRepository from "../../../../../repositories/ManagementCustomerRepository";
import PopupUtility from "../../../../../utils/popup-utility";
import moment from "moment";

const PopupTable = ({ onCancel, id }) => {
  const t = useTranslation();
  const [data, setData] = useState([]);
  const [fieldName, setFieldName] = useState([]);
  const [orderBy, setOrderBy] = useState([]);

  const sortData = async (fieldName, orderBy) => {
    setData([]);
    setFieldName(fieldName || "");
    setOrderBy(orderBy || "");
    let response = await ManagementCustomerRepository.getDetail({
      id: id,
      fieldName: fieldName,
      orderBy: orderBy,
    });
    if (!response.error) {
      setData(response.data.remarkHistory);
    } else {
      PopupUtility.responseValidate("Failed", response.message);
    }
  };

  const enumStatus = Object.freeze({
    "-2": t("management.is_deleted"),
    "-1": t("management.suspended"),
    0: t("management.req_suspended"),
    1: t("management.active"),
  });

  useEffect(() => {
    sortData();
  }, []);

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => {
          onCancel();
        }}
      />
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-4xl p-4 mx-auto bg-gray-primary rounded-xl shadow-lg">
          <div className="m-3">
            <p className="text-green-primary text-xl font-bold mb-3">
              {t("management.history_remark")}
            </p>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
              <table className="table-auto w-full text-left">
                <thead className="bg-green-secondary text-white">
                  <tr>
                    <th className="p-2">
                      <ButtonSort
                        title={t("management.writer_name")}
                        isAsc={
                          fieldName === "writer"
                            ? orderBy === "asc"
                            : false
                        }
                        isDesc={
                          fieldName === "writer"
                            ? orderBy === "desc"
                            : false
                        }
                        sortAsc={() => {
                          sortData("writer", "asc");
                        }}
                        sortDesc={() => {
                          sortData("writer", "desc");
                        }}
                        color="white"
                      />
                    </th>
                    <th>
                      <ButtonSort
                        title={t("management.writer_date")}
                        isAsc={
                          fieldName === "date"
                            ? orderBy === "asc"
                            : false
                        }
                        isDesc={
                          fieldName === "date"
                            ? orderBy === "desc"
                            : false
                        }
                        sortAsc={() => {
                          sortData("date", "asc");
                        }}
                        sortDesc={() => {
                          sortData("date", "desc");
                        }}
                        color="white"
                      />
                    </th>
                    <th>
                      <ButtonSort
                        title={t("management.writer_type")}
                        isAsc={
                          fieldName === "type"
                            ? orderBy === "asc"
                            : false
                        }
                        isDesc={
                          fieldName === "type"
                            ? orderBy === "desc"
                            : false
                        }
                        sortAsc={() => {
                          sortData("type", "asc");
                        }}
                        sortDesc={() => {
                          sortData("type", "desc");
                        }}
                        color="white"
                      />
                    </th>
                    <th>{t("management.remarks")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 &&
                    data.map((items, index) => (
                      <tr
                        key={items.id}
                        className={`${index % 2 === 1 ? " bg-green-table" : ""
                          }`}
                      >
                        <td className="p-2">{items.writer}</td>
                        <td>{moment(items.date).format('MMM DD, YYYY')}</td>
                        <td>{enumStatus[items.type]}</td>
                        <td className="break-all" width={300}>{items.remark}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <ButtonGreen
                title={t("general.close")}
                onClick={() => {
                  onCancel();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupTable;
