import React, { useState, useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import ButtonSort from "../../../../../components/ButtonSort/ButtonSort";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ManagementCustomerRepository from "../../../../../repositories/ManagementCustomerRepository";
import PopupUtility from "../../../../../utils/popup-utility";
import moment from "moment";

const TransactionHistory = ({ onCancel, id }) => {
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
            const data = response.data.orderHistory.map(history => {
                return {
                    invoiceNumber: history.noInvoice,
                    date: moment(history.date).format('MMM DD, YYYY'),
                    status: history.status
                };
            });
            setData(data);
        } else {
            PopupUtility.responseValidate("Failed", response.message);
        }
    };

    const orderStatus = Object.freeze({
        "COMPLETED": t("general.completed"),
        "CANCELED": t("general.cancelled"),
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
                            {t("management.transaction_history")}
                        </p>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
                            <table className="table-auto w-full text-left">
                                <thead className="bg-green-secondary text-white">
                                    <tr>
                                        <th className="p-2">
                                            <ButtonSort
                                                title={t("management.invoice_number")}
                                                isAsc={
                                                    fieldName === "noInvoice"
                                                        ? orderBy === "asc"
                                                        : false
                                                }
                                                isDesc={
                                                    fieldName === "noInvoice"
                                                        ? orderBy === "desc"
                                                        : false
                                                }
                                                sortAsc={() => {
                                                    sortData("noInvoice", "asc");
                                                }}
                                                sortDesc={() => {
                                                    sortData("noInvoice", "desc");
                                                }}
                                                color="white"
                                            />
                                        </th>
                                        <th>
                                            <ButtonSort
                                                title={t("management.transaction_date")}
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
                                            <p>{t("management.order_status")}</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 &&
                                        data.map((items, index) => (
                                            <tr
                                                key={items.id}
                                                className={`${index % 2 === 1 ? " bg-green-table" : ""
                                                    }`}>
                                                <td className="p-2">{items.invoiceNumber}</td>
                                                <td>{items.date}</td>
                                                <td>{orderStatus[items.status]}</td>
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

export default TransactionHistory;
