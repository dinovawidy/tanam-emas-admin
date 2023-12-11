import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-multi-lang";
import { useSelector } from "react-redux";

const Total = ({ totalPosts }) => {
  const t = useTranslation();
  const loading = useSelector((state) => state.reducer.loading);
  if (loading) {
    return <Skeleton count={2} height="20px" />;
  }
  return (
    <>
      <h4 className="opacity-60 font-bold pb-5">
        {t("management.details").toUpperCase()}
      </h4>
      <p className="text-sm font-medium">{t("management.total_pickup")}</p>
      <p className="text-md font-bold">{totalPosts}</p>
    </>
  );
};

export default Total;
