import React, { useState, useEffect } from "react";
import ButtonGold from "../../../../../components/ButtonGold/ButtonGold";
import { useTranslation } from "react-multi-lang";

const ButtonRequest = ({ totalReqMerchant, getPage }) => {
  const [total, setTotal] = useState(0);
  const t = useTranslation();
  
  useEffect(() => {
    setTotal(totalReqMerchant);
  }, [totalReqMerchant]);

  return (
    <ButtonGold
      title={t("management.requests")}
      span={total}
      onClick={() => {
        getPage();
      }}
    />
  );
};

export default ButtonRequest;
