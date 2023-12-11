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
  const detailProduct = useSelector((state) => state.reducer.detailProduct);
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
    "-2": t("management.take_down"),
    "-1": t("management.req_take_down"),
    0: t("management.inactive"),
    1: t("management.active"),
    2: t("management.mark_as_checked"),
  });

  return (
    <>
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="text-green-secondary font-semibold">
            <th className="p-2 my-2">
              <ButtonSort
                title={t("management.upload_date")}
                isAsc={
                  fieldName === "uploadDate"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "uploadDate"
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
                    fieldName: "uploadDate",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "uploadDate",
                    orderBy: "desc",
                  });
                }}
              />
            </th>

            <th>{t("management.product_category")}</th>

            <th>
              <ButtonSort
                title={t("management.product_id")}
                isAsc={
                  fieldName === "productId"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "productId"
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
                    fieldName: "productId",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "productId",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            <th>
              <ButtonSort
                title={t("management.product_name")}
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
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "brandName",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "brandName",
                    orderBy: "desc",
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
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "merchantName",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 0,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "merchantName",
                    orderBy: "desc",
                  });
                }}
              />
            </th>
            {/* <th>
            <ButtonSort
                title={t("management.sales_count")}
                isAsc={
                  fieldName === "salesCount"
                    ? orderBy === "asc"
                      ? true
                      : false
                    : false
                }
                isDesc={
                  fieldName === "salesCount"
                    ? orderBy === "desc"
                      ? true
                      : false
                    : false
                }
                sortAsc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "salesCount",
                    orderBy: "asc",
                  });
                }}
                sortDesc={() => {
                  Action.getList(dispatch, {
                    currentPage: 1,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    fieldName: "salesCount",
                    orderBy: "desc",
                  });
                }}
              />
            </th> */}
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
              style={detailProduct.productId === item.id ? customStyles : {}}
              onClick={() => {
                if (detailProduct.productId !== item.id) {
                  Action.changeShowDetail(dispatch, true, item.id);
                } else {
                  Action.changeShowDetail(dispatch, false);
                }
              }}
            >
              <td className="p-2 my-2 relative">
                {detailProduct.productId === item.id ? <BorderCustom /> : ""}
                <span className="block ml-2">{item.upload_date}</span>
              </td>
              <td>{item.product_category}</td>
              <td width={150}>{item.id}</td>
              <td className="font-semibold">
                {item.product_category === "Jewellery" ? (
                  <>
                    {item.name_jewelry} {item.subCategoryName}
                  </>
                ) :
                  <>
                    {item.brand_name} - {item.edition_name} - {item.weight}gr
                  </>
                }

              </td>
              <td>{item.merchant_name}</td>
              {/* <td width={100}>{item.sales_count}</td> */}
              <td>{enumStatus[item.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabel;
