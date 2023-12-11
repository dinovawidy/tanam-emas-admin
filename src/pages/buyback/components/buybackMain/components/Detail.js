import React from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const t = useTranslation();
  const itemDetail = useSelector((state) => state.reducer.itemDetail);

  const enumStatus = Object.freeze({
    "-2": "Revise",
    "-1": "Cancelled",
    0: "Requested",
    1: "Accepted",
    2: "Completed",
    3: "Confirmed (Revise)",
    4: "Declined",
    5: "Completed",
  });

  return (
    <div className="font-medium text-sm">
      <h4 className="flex-1 opacity-60 font-bold pb-4">
        {t("management.details").toUpperCase()}
      </h4>

      <div className="max-h-92 overflow-y-auto">
        {itemDetail.productCategory === "Jewellery" ? (

        
        <div className="flex flex-row pb-2">
          <div className="flex-1">
            
              <div className="w-24 h-24 border-2 border:bg-gray-primary rounded-xl">
                <img
                  className="h-full w-full rounded-xl"
                  src={itemDetail.productDetail.firstImage}
                  alt={itemDetail.productDetail.name}
                />
              </div>
            
          </div>
          
          <div className="text-right">
            <div className="min-w-fit px-4 py-1 text-green-primary font-bold rounded-xl border-2 border-green-secondary border-opacity-40">
              {enumStatus[itemDetail.status]}
            </div>
          </div>
        </div>
        ) : ""}

        <div className="flex flex-row pb-2">
          <div className="mr-10">
            <p className="text-green-quaternary">
              {t("management.customer_name")}
            </p>
            <p className="font-bold text-md">{itemDetail.customerName}</p>
          </div>
          {itemDetail.productCategory === "Gold Bar" ? (
          <div className="text-right ml-20">
            <div className="min-w-fit px-4 py-1 text-green-primary font-bold rounded-xl border-2 border-green-secondary border-opacity-40">
              {enumStatus[itemDetail.status]}
            </div>
          </div>
          ) : ""}
          </div>

        <div className="pb-2">
          <p className="text-green-quaternary">
            {t("buyback.buyback_category")}
          </p>
          <p className="font-bold text-md">{itemDetail.productCategory}</p>
        </div>

        {/* condition if category GoldBar */}
        {itemDetail.productCategory === "Gold Bar" ? (
          <div className="pb-2">
            <p className="text-green-quaternary">{t("management.merchant")}</p>
            <p className="font-bold text-md">{itemDetail.merchantName}</p>
          </div>
        ) : (
          ""
        )}

        {/* condition if category Jewellery */}
        {itemDetail.productCategory === "Jewellery" ? (
          <div className="pb-2">
            <p className="text-green-quaternary">
              {t("management.product_name")}
            </p>
            <p className="font-bold text-md">{itemDetail.productDetail.name}</p>
          </div>
        ) : (
          ""
        )}

        {/* condition if category Jewellery */}
        {itemDetail.productCategory === "Jewellery" &&
        itemDetail.variantDetail !== null ? (
          <div className="pb-2">
            <p className="text-green-quaternary">{t("management.variant")}</p>
            <div className="flex">
              {itemDetail.variantDetail.variantOptionSize !== null ? (
                <p className="font-bold text-md">
                  {itemDetail.variantDetail.variantOptionSize.name}
                </p>
              ) : (
                ""
              )}

              {itemDetail.variantDetail.variantOptionColor !== null ? (
                <p className="font-bold text-md">
                  ,{itemDetail.variantDetail.variantOptionColor.name}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* condition if category Jewellery */}

        {itemDetail.productCategory === "Jewellery" &&
        itemDetail.productDetail.preciousStoneDetail !== null ? (
          <>
            <div className="pb-2">
              <p className="text-green-quaternary">
                {t("buyback.certificate_code")}
              </p>
              <p className="font-bold text-md">
                {
                  itemDetail.productDetail.preciousStoneDetail
                    .preciousStoneCertificationCode
                }
              </p>
            </div>
            <div className="flex pb-2">
              <div className="basis-1/2">
                <p className="text-green-quaternary">
                  {t("buyback.carat_weight")}
                </p>
                <p className="font-bold text-md">
                  {itemDetail.productDetail.preciousStoneDetail.caratWeight}gr
                </p>
              </div>
              <div className="basis-1/2">
                <p className="text-green-quaternary">
                  {t("buyback.precious_stone_weight")}
                </p>
                <p className="font-bold text-md">
                  {
                    itemDetail.productDetail.preciousStoneDetail
                      .preciousStoneWeight
                  }gr
                </p>
              </div>
            </div>

            <div className="flex pb-2">
              <div className="basis-1/2">
                <p className="text-green-quaternary">
                  {t("buyback.color_grade")}
                </p>
                <p className="font-bold text-md">
                  {itemDetail.productDetail.preciousStoneDetail.colorGrade}
                </p>
              </div>

              <div className="basis-1/2">
                <p className="text-green-quaternary">
                  {t("buyback.clarity_grade")}
                </p>
                <p className="font-bold text-md">
                  {itemDetail.productDetail.preciousStoneDetail.clarityGrade}
                </p>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {itemDetail.productCategory === "Jewellery" ? (
          <>
            <hr className="mb-4" />
            <div className="flex pb-2">
              <div className="basis-1/2">
                <p className="text-green-quaternary">{t("buyback.carat")}</p>
                <p className="font-bold text-md">
                  {itemDetail.productDetail.carat.name}
                </p>
              </div>

              <div className="basis-1/2">
                <p className="text-green-quaternary">{t("buyback.weight")}</p>
                <p className="font-bold text-md">
                  {itemDetail.productDetail.weight}gr
                </p>
              </div>
            </div>

            <div className="pb-2">
              <p className="text-green-quaternary">
                {t("buyback.product_dimension")}
              </p>
              <p className="font-bold text-md">
                {itemDetail.productDetail.length} x{" "}
                {itemDetail.productDetail.width} x{" "}
                {itemDetail.productDetail.height}cm
              </p>
            </div>
          </>
        ) : (
          ""
        )}

        {itemDetail.productCategory === "Gold Bar" ? (
          <div className="">
            <div className="basis-1/2">
              <p className="text-green-quaternary">{t("buyback.fineness")}</p>
              <p className="font-bold text-md">{itemDetail.fineness}.9</p>
            </div>

            <div className="basis-1/2">
              <p className="text-green-quaternary">
                {t("buyback.total_weight")}
              </p>
              <p className="font-bold text-md">{itemDetail.weight} gram</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Detail;
