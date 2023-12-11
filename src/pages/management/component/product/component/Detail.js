import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../components/ButtonWhite/ButtonWhite";
import ConfirmationModal from "../../../../../components/ConfirmationModal/ConfirmationModal";
import Action from "../redux/Action";
import UseAuth from "../../../../auth/Auth";
import GeneralUtility from "../../../../../utils/general-utility";
import ModalDetail from "./ModalDetail";
import PopupTable from "./PopupTable";
import { setRemark } from "../redux/Reducer";

const Detail = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const modalTakedown = useSelector((state) => state.reducer.modalTakedown);
  const modalReqTakedown = useSelector(
    (state) => state.reducer.modalReqTakedown
  );
  const modalDecline = useSelector((state) => state.reducer.modalDecline);
  const modalChecked = useSelector((state) => state.reducer.modalChecked);
  const modalInactive = useSelector((state) => state.reducer.modalInactive);
  const modalDetail = useSelector((state) => state.reducer.modalDetail);
  const detailProduct = useSelector((state) => state.reducer.detailProduct);
  const remark = useSelector((state) => state.reducer.remark);

  const enumStatus = Object.freeze({
    "-2": t("management.take_down"),
    "-1": t("management.req_take_down"),
    0: t("management.inactive"),
    1: t("management.active"),
    2: t("management.mark_as_checked"),
  });

  useEffect(() => {
    Action.getVariantDetails(dispatch);
  }, []);

  return (
    <div className="font-medium text-sm">
      <div className="flex flex-row items-center pb-4">
        <h4 className="flex-1 opacity-60 font-bold">
          {t("management.details").toUpperCase()}
        </h4>
      </div>

      <div className="h-72 overflow-y-auto max-w-xs">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-5 pb-2 w-[34rem]">
            {detailProduct.listImg.map((item, index) => (
              <div className="bg-black rounded-xl h-24 w-24" key={index}>
                <img
                  className="h-24 w-24"
                  src={item.imgFile}
                  alt="product"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
        -
        <div className="flex flex-row items-center pt-4 pb-2">
          {detailProduct.categoryName === "Gold Bar" ? (
            <div className="flex-1">
              <p className="text-green-quaternary">
                {t("management.brand_name")}
              </p>
              <p className="font-bold text-md">{detailProduct.brandName}</p>
            </div>
          ) : (
            <div className="flex-1">
              <p className="text-green-quaternary">
                {t("management.product_name")}
              </p>
              <p className="font-bold text-md">{detailProduct.name}</p>
            </div>
          )}
          <div className="text-right mr-5">
            <div className="px-4 py-1 text-green-primary font-bold rounded-xl border-2 border-green-secondary border-opacity-40">
              {enumStatus[detailProduct.status]}
            </div>
          </div>
        </div>
        {/* condition for product category */}
        <div className="flex mb-3">
          <div className="flex-1">
            <p className="text-green-quaternary">
              {t("management.product_category")}
            </p>
            <p className="font-bold text-md">{detailProduct.categoryName}</p>
          </div>

          {detailProduct.categoryName === "Jewellery" ? (
            <div className="flex-1">
              <p className="text-green-quaternary">
                {t("management.product_jewelry_category")}
              </p>
              <p className="font-bold text-md">
                {detailProduct.subCategoryName}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        {detailProduct.categoryName === "Gold Bar" && (
          <div className="pb-2">
            <p className="text-green-quaternary">{t("management.edition")}</p>
            <p className="font-bold text-md">{detailProduct.edition}</p>
          </div>
        )}
        {/* condition diamond yes variant no */}
        {detailProduct.preciousStoneDetail !== null && (
          <div className="pb-2 mt-2">
            <p className="text-green-quaternary">
              {t("management.precious_certificate")}
            </p>
            <p className="font-bold text-md">
              {detailProduct.preciousStoneDetail.preciousStoneCertificationCode}
            </p>
          </div>
        )}
        {/* condition diamond yes variant no */}
        {detailProduct.preciousStoneDetail !== null && (
          <div className="flex flex-row pb-2">
            <div className="flex-1">
              <p className="text-green-quanternary">
                {t("management.carat_weight")}
              </p>
              <p className="font-bold text-md">
                {detailProduct.preciousStoneDetail.caratWeight}
              </p>
            </div>

            <div className="flex-1">
              <p className="text-green-quanternary">
                {t("management.precious_stone_weight")}
              </p>
              <p className="font-bold text-md">
                {detailProduct.preciousStoneDetail.preciousStoneWeight}
              </p>
            </div>
          </div>
        )}
        {/* condition diamond yes variant no */}
        {detailProduct.preciousStoneDetail !== null && (
          <div className="flex flex-row pb-2">
            <div className="flex-1">
              <p className="text-green-quanternary">
                {t("management.color_grade")}
              </p>
              <p className="font-bold text-md">
                {detailProduct.preciousStoneDetail.colorGrade}
              </p>
            </div>

            <div className="flex-1">
              <p className="text-green-quanternary">
                {t("management.clarity_grade")}
              </p>
              <p className="font-bold text-md">
                {detailProduct.preciousStoneDetail.clarityGrade}
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-row pb-2">
          {/* condition diamond no variant no */}
          {detailProduct.categoryName === "Jewellery" ? (
            <div className="flex-1">
              <p className="text-green-quaternary">{t("management.carat")}</p>
              <p className="font-bold text-md">{detailProduct.carat.name}</p>
            </div>
          ) : (
            ""
          )}
          <div className="flex-1">
            <p className="text-green-quaternary">{t("management.weight")}</p>
            <p className="font-bold text-md">{detailProduct.weight}g</p>
          </div>
          {(detailProduct.preciousStoneDetail === null &&
            !detailProduct.productVariants) ||
          detailProduct.productVariants === null ? (
            <div className="mr-0 flex-1">
              <p className="text-green-quaternary">
                {t("management.fineness")}
              </p>
              <p className="font-bold text-md">999.9</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="pb-2 mb-3">
          <p className="text-green-quaternary">{t("management.stock")}</p>
          <p className="font-bold text-md">{detailProduct.stock}</p>
        </div>
        {detailProduct.categoryName === "Gold Bar" && (
          <div className="pb-2">
            <p className="text-green-quaternary">{t("management.gramasi")}</p>
            <p className="font-bold text-md">{detailProduct.gramasi}</p>
          </div>
        )}
        <div className="pb-2">
          <p className="text-green-quaternary">{t("management.dimension")}</p>
          <p className="font-bold text-md">{detailProduct.dimension}</p>
        </div>
        {(detailProduct.preciousStoneDetail === null &&
          !detailProduct.productVariants) ||
        detailProduct.productVariants === null ? (
          <div className="flex">
            <div className="flex-1">
              <p className="text-green-quaternary">{t("management.price")}</p>
              {/* <p className="font-bold text-md">Rp {detailProduct.price}</p> */}
              <p className="font-bold text-md">
                Rp {GeneralUtility.addSeparator(detailProduct.price)}
              </p>
            </div>

            <div className="mr-0 flex-1">
              <p className="text-green-quaternary">
                {t("management.promotional_price")}
              </p>
              <p className="font-bold text-md">
                Rp {GeneralUtility.addSeparator(detailProduct.promotionalPrice)}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* buyback availability */}
        {detailProduct.categoryName === "Jewellery" &&
        detailProduct.buybackCompability === true ? (
          <div className="mr-0 mt-2 mb-3">
            <p className="text-green-quaternary">
              {t("management.buyback_avilability")}
            </p>
            <p className="font-bold text-md">{t("management.available")}</p>
          </div>
        ) : (
          ""
        )}
        {detailProduct.remark.length > 0 && (
          <>
            <hr />
            <div className="pb-2 pt-4">
              <p className="text-green-quaternary">
                {t("management.suspended_by")}
              </p>
              <p className="font-bold text-md">
                {detailProduct.remark[0].writer}
              </p>
            </div>
            <div className="pb-2">
              <div className="flex justify-between">
                <p className="text-green-quaternary">
                  {t("management.remarks")}
                </p>
                <p
                  className=" text-gold-secondary hover:text-gold-primary cursor-pointer"
                  onClick={() => {
                    dispatch(setRemark(true));
                  }}
                >
                  {t("management.history")}
                </p>
              </div>
              <p className="font-bold text-md">
                {detailProduct.remark[0].remark}
              </p>
            </div>
          </>
        )}
        {/* diamond no variant yes */}
        {detailProduct.productVariants !== null ? (
          <>
            <hr className="pb-2"></hr>
            <div className="flex pb-2">
              <div className="flex-1">
                <h4 className="text-l space-5 font-bold text-green-quaternary">
                  {t("management.variant")}
                </h4>
              </div>
              <div className="mr-5">
                <a
                  className="cursor-pointer"
                  onClick={() => {
                    Action.changeModalDetail(dispatch, { showModal: true });
                  }}
                >
                  <p className="font-bold text-gold-secondary">
                    {t("management.more_detail")}
                  </p>
                </a>
              </div>
            </div>
            <div className="pb-2 ">
              {detailProduct.productVariants[0].variantOptionSize !== null ? (
                <p className="text-green-quaternary">{t("management.size")}</p>
              ) : (
                ""
              )}
              <p className="pr-0.5 font-bold text-md">
                {detailProduct.productVariants &&
                  detailProduct.productVariants.map((item, index) =>
                    item.variantOptionSize !== null
                      ? item.variantOptionSize.name
                      : ""
                  )}
              </p>
            </div>

            <div className="pb-2">
              {detailProduct.productVariants[0].variantOptionColor !== null ? (
                <p className="text-green-quaternary">{t("management.color")}</p>
              ) : (
                ""
              )}
              <p className="font-bold text-md">
                {detailProduct.productVariants &&
                  detailProduct.productVariants.map((item, index) =>
                    item.variantOptionColor !== null
                      ? item.variantOptionColor.name
                      : ""
                  )}
              </p>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-row-reverse gap-x-2">
        {detailProduct.status === -1 &&
        UseAuth.checkFunction(
          "takedown-product-management-button",
          "button"
        ) === true ? (
          <ButtonGreen
            title={t("management.take_down")}
            onClick={() => {
              Action.changeModalTakedown(dispatch, { showModal: true });
            }}
          />
        ) : null}

        {(detailProduct.status === 1 || detailProduct.status === 2) &&
        UseAuth.checkFunction(
          "reqtakedown-product-management-button",
          "button"
        ) === true ? (
          <ButtonGreen
            title={t("management.req_take_down")}
            onClick={() => {
              Action.changeModalReqTakedown(dispatch, { showModal: true });
            }}
          />
        ) : null}
        {detailProduct.status === -1 ||
        (detailProduct.status === 2 &&
          UseAuth.checkFunction(
            "decline-product-management-button",
            "button"
          ) === true) ? (
          <ButtonWhite
            title={t("management.decline")}
            onClick={() => {
              Action.changeModalDecline(dispatch, { showModal: true });
            }}
          />
        ) : null}

        {detailProduct.status === 1 ? (
          <ButtonWhite
            title={t("management.mark_as_checked")}
            onClick={() => {
              Action.changeModalChecked(dispatch, { showModal: true });
            }}
          />
        ) : null}

        {/* {detailProduct.status === 1 || detailProduct.status === 2 ? (
          <ButtonWhite
            title={t("management.inactive")}
            onClick={() => {
              Action.changeModalInactive(dispatch, { showModal: true });
            }}
          />
        ) : (
          ""
        )} */}
      </div>

      {modalReqTakedown ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalReqTakedown(dispatch, { showModal: showModal });
          }}
          title={t("management.title_req_take_down")}
          subtitle={t("management.sub_title_req_take_down")}
          onClick={({ remark, status }) => {
            Action.handleSubmitReqTakedown(dispatch, {
              id: detailProduct.productId,
              remarks: remark,
              status: status,
            });
          }}
        />
      ) : null}

      {modalTakedown ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalTakedown(dispatch, { showModal: showModal });
          }}
          title={t("management.title_take_down")}
          subtitle={t("management.sub_title_take_down")}
          onClick={({ remark, status }) => {
            Action.handleSubmitTakedown(dispatch, {
              id: detailProduct.productId,
              remarks: remark,
              status: status,
            });
          }}
        />
      ) : null}

      {modalChecked ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalChecked(dispatch, { showModal: showModal });
          }}
          title={t("management.title_mark_as_checked")}
          subtitle={t("management.sub_title_mark_as_checked")}
          onClick={({ remark, status }) => {
            Action.handleSubmitMarkaschecked(dispatch, {
              id: detailProduct.productId,
              remarks: remark,
              status: status,
            });
          }}
        />
      ) : null}

      {modalDecline ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalDecline(dispatch, { showModal: showModal });
          }}
          title={t("management.title_decline")}
          subtitle={t("management.sub_title_decline")}
          onClick={({ remark, status }) => {
            Action.handleSubmitDecline(dispatch, {
              id: detailProduct.productId,
              remarks: remark,
              status: status,
            });
          }}
        />
      ) : null}

      {modalInactive ? (
        <ConfirmationModal
          onCancel={({ showModal }) => {
            Action.changeModalInactive(dispatch, { showModal: showModal });
          }}
          title={t("management.title_inactive")}
          subtitle={t("management.sub_title_inactive")}
          onClick={({ remark, status }) => {
            Action.handleSubmitInactive(dispatch, {
              id: detailProduct.productId,
              remarks: remark,
              status: status,
            });
          }}
        />
      ) : null}

      {modalDetail && <ModalDetail />}

      {remark && (
        <PopupTable
          onCancel={() => {
            dispatch(setRemark(false));
          }}
          id={detailProduct.productId}
        />
      )}
    </div>
  );
};

export default Detail;
