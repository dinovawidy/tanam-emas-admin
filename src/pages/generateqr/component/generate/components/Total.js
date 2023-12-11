import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-multi-lang";

const Total = ({ totalProduct, totalQuantity }) => {
  const t = useTranslation();
  return (
    <>
      <h4 className="opacity-60 font-bold pb-5">
        {t("management.details").toUpperCase()}
      </h4>
      <div className="pb-2">
        <p className="text-sm font-medium">{t("generateqr.total_product")}</p>
        <p className="text-md font-bold">{totalProduct}</p>
      </div>
      <div className="pb-2">
        <p className="text-sm font-medium">{t("generateqr.total_quantity")}</p>
        <p className="text-md font-bold">{totalQuantity}</p>
      </div>
    </>
  );
};

export default Total;
