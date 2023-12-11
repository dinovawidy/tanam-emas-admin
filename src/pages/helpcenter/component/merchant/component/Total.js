import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-multi-lang";

const Total = ({ totalData, loading }) => {
  const t = useTranslation();
  if (loading) {
    return <Skeleton count={2} height="20px" />;
  }
  return (
    <>
      <h4 className="opacity-60 font-bold pb-5">
        {t("management.details").toUpperCase()}
      </h4>
      <p className="text-sm font-medium">{t("helpcenter.total_feedback")}</p>
      <p className="text-md font-bold">{totalData}</p>
    </>
  );
};

export default Total;
