import React from "react";
import { useTranslation } from "react-multi-lang";

const HeaderTabel = () => {
  const t = useTranslation();
  return (
    <>
      <h4 className="opacity-60 font-bold">
        {t("generateqr.export_list").toUpperCase()}
      </h4>
    </>
  );
};

export default HeaderTabel;
