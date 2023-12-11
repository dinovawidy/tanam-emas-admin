import React from "react";
import Skeleton from "react-loading-skeleton";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/Pagination/Pagination";
import en from "../../../../translations/en.json";
import id from "../../../../translations/id.json";
import Action from "../../redux/Action";
import GeneralUtility from "../../../../utils/general-utility";
setTranslations({ en, id });
setDefaultLanguage("en");

const TopSellingProducts = ({ filter }) => {
  const t = useTranslation();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.reducer.isLoadingTopSelling);
  const data = useSelector((state) => state.reducer.topSellingData);
  const currentPage = useSelector(
    (state) => state.reducer.topSellingCurrentPage
  );
  const totalPage = useSelector((state) => state.reducer.topSellingTotalPage);
  const totalData = useSelector((state) => state.reducer.topSellingTotalData);

  return (
    <div className="section-grey p-2 h-[45vh] overflow-y-auto">
      <h2 className="text-sm p-2 font-semibold tracking-widest text-[#A7ADA9]">
        {t("dashboard.top_selling_products").toUpperCase()}
      </h2>
      {isLoading ? (
        <Skeleton count={6} height="40px" />
      ) : (
        <>
          <table className="flex-auto w-full table-auto border-separate border-spacing-y-1 text-left">
            <thead>
              <tr className="text-green-secondary font-semibold">
                <th className="p-2"></th>
                <th>{t("dashboard.product_name")}</th>
                <th>{t("dashboard.merchant_name")}</th>
                <th>{t("dashboard.sales_count")}</th>
                <th>{t("dashboard.total_sales")}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="bg-white" key={index}>
                  <td className="p-2 font-semibold">{item.id + 1}</td>
                  <td className="font-semibold">{item.product}</td>
                  <td className="font-semibold">{item.merchant}</td>
                  <td>{GeneralUtility.addCommas(item.salesCount)}</td>
                  <td>Rp.{GeneralUtility.addCommas(item.totalSales)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 ? (
            <div className="w-full text-center">
              <img
                className="w-full max-h-[11rem] my-3"
                src={process.env.REACT_APP_ASSETS_IMAGE + "product-empty.svg"}
                alt="empty-order"
              />
              <div className="text-xl font-medium">
                {t("dashboard.empty_product")}
              </div>
            </div>
          ) : (
            <Pagination
              currentPage={currentPage}
              postsPerPage={5}
              totalPage={totalPage}
              totalPosts={totalData}
              onClick={(page) => {
                Action.getTopSelling(dispatch, { page: page, time: filter });
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TopSellingProducts;
