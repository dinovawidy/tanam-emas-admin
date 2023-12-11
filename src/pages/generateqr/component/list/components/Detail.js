import React from "react";
import { useTranslation } from "react-multi-lang";
import { useSelector } from "react-redux";
import QR from "../../../../../components/QR/QR";

const Detail = () => {
  const t = useTranslation();
  const itemDetail = useSelector((state) => state.reducer.itemDetail);

  return (
    <div className="font-medium text-sm">
      <h4 className="flex-1 opacity-60 font-bold pb-4">
        {t("management.details").toUpperCase()}
      </h4>

      <div className="max-h-92 overflow-y-auto">
        <div className="flex flex-row pb-2">
          <div className="flex-1">
            <p className="text-green-quaternary pb-2">
              {t("generateqr.product_photo")}
            </p>
            <div className="grid grid-cols-2 pr-12">
              {itemDetail.images.map((item, index) => (
                <div
                  className="w-[8em] h-[8em] border-4 border:bg-gray-primary rounded-xl"
                  key={index}
                >
                  <img
                    className="w-full h-full rounded-xl"
                    src={item}
                    alt={itemDetail.brandName}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="text-right">
            <QR value={itemDetail.serialNumber} />
          </div>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">
            {t("generateqr.serial_number")}
          </p>
          <p className="font-bold text-md">{itemDetail.serialNumber}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("generateqr.brand_name")}</p>
          <p className="font-bold text-md">{itemDetail.brandName}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("generateqr.edition")}</p>
          <p className="font-bold text-md">{itemDetail.edition}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("generateqr.weight")}</p>
          <p className="font-bold text-md">{itemDetail.grams.name}</p>
        </div>

        <div className="pb-2">
          <p className="text-green-quaternary">{t("generateqr.fineness")}</p>
          <p className="font-bold text-md">{itemDetail.fineness}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
