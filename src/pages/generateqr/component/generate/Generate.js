import React, { useState } from "react";
import Total from "./components/Total";
import HeaderTabel from "./components/HeaderTable";
import Tabel from "./components/Table";
import Action from "./redux/Action";
import { useTranslation } from "react-multi-lang";
import ButtonGold from "../../../../components/ButtonGold/ButtonGold";

const Generate = ({ page, getPage }) => {
  const t = useTranslation();
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [list, setList] = useState([]);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-row items-center px-2 gap-x-2">
          <i
            className={`${page !== "main" ? "cursor-pointer" : ""} mt-1.5`}
            onClick={() => {
              getPage("main");
            }}
          >
            <img
              className="h-full w-10"
              src={process.env.REACT_APP_ASSETS_IMAGE + "back-icon.svg"}
              alt="back-icon"
            />
          </i>
          <h2 className="text-green-primary font-bold">
            {t("generateqr.title")}
          </h2>
        </div>
        <div className="flex-1 text-right">
          <ButtonGold
            title={t("generateqr.export")}
            onClick={() => {
              Action.exportData(list, getPage);
            }}
          />
        </div>
      </div>

      <div className="pt-6">
        <div className="flex gap-x-3">
          <div className="basis-8/12">
            <div className="rounded-2xl p-5 bg-gray-primary">
              <div className="flex flex-row items-center gap-x-5">
                <HeaderTabel />
              </div>
              <div className="my-2">
                <Tabel
                  getTotalProduct={(value) => {
                    Action.getTotalProduct(
                      value,
                      totalProduct,
                      setTotalProduct
                    );
                  }}
                  getTotalQuantity={(value) => {
                    Action.getTotalQuantity(
                      value,
                      totalQuantity,
                      setTotalQuantity
                    );
                  }}
                  list={list}
                  setList={setList}
                />
              </div>
            </div>
          </div>
          <div className="basis-4/12">
            <div className="p-5 bg-gray-primary rounded-2xl h-auto">
              <Total
                totalProduct={totalProduct}
                totalQuantity={totalQuantity}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generate;
