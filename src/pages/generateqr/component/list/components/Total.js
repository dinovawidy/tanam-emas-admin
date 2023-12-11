import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-multi-lang";
import { useSelector } from "react-redux";

const Total = ({ totalProduct }) => {
  const t = useTranslation();
  const loading = useSelector((state) => state.reducer.loading);
  if (loading) {
    return <Skeleton count={3} height="20px" />;
  }
  return (
    <>
      <h4 className="opacity-60 font-bold pb-5">
        {t("management.details").toUpperCase()}
      </h4>
      <div className="pb-2">
        <p className="text-sm font-medium">{t("generateqr.total_product")}</p>
        <p className="text-md font-bold">{totalProduct}</p>
      </div>
    </>
  );
};

export default Total;
