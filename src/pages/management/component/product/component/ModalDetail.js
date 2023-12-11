import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import Action from "../redux/Action";
import ModalImage from "../../../../../components/ModalImage/ModalImage";
import { setTitleImage } from "../redux/Reducer";

const ModalDetail = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  // const list = useSelector((state) => state.reducer.list);
  const modalImage = useSelector((state) => state.reducer.modalImage)
  const titleImage = useSelector((state) => state.reducer.titleImage);
  const srcImage = useSelector((state) => state.reducer.srcImage);
  const detailProduct = useSelector((state) => state.reducer.detailProduct);

  useEffect(() => {
    Action.getVariantDetails(dispatch)
  }, [])
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => {
            Action.changeModalDetail(dispatch, { showModal: false });
          }}
        ></div>

        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-xl p-4 mx-auto bg-gray-primary rounded-xl shadow-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                // fill="orange"
                // fill="blue"
                viewBox="0 0 25 25"
                strokeWidth={2}
                fill="#ed6866"
                stroke="currentColor"
                className="w-5 h-5 float-right cursor-pointer bg-gold fill-blue-500"
                onClick={() => {
                    Action.changeModalDetail(dispatch, { showModal: false });
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

            <div className="m-3 text-left ">
              <h3 className="text-green-primary font-bold">
                {t("management.variant_details")}
              </h3>
              <table className="space-x-4 w-full">
                <thead className="space-x-4">
                  <tr className="space-x-4">
                    {detailProduct.productVariants[0].image !== null ? (
                      <th className="p-2 my-2">Picture</th>
                    ) : "" }
                    {detailProduct.productVariants[0].variantOptionSize !== null ? (
                      <th className="p-2 my-2">Size</th>
                    ) : ""}

                    {detailProduct.productVariants[0].variantOptionColor !== null ? (
                      <th className="p-2 my-2">Color</th>
                    ) : ""}
                    <th className="p-2 my-2">Stock</th>
                    <th className="p-2 my-2">Normal Price</th>
                    <th className="p-2 my-2">Promotional Price</th>
                    <th className="p-2 my-2">Weight</th>
                  </tr>
                </thead>
                <tbody className="font-medium">
                  {detailProduct.productVariants && detailProduct.productVariants.map((item, index) => (
                  <tr
                  key={index}
                  className="bg-white border-4 border-gray-primary">
                    {item.image !== null ? (
                    <td className="p-2 my-2 text-centter w-6 h-6">
                    <div className="flex flex-row gap-x-2 pt-1"
                        key={index}
                        onClick={() => {
                          Action.changeModalImage(dispatch, {
                            showModal: true,
                            title: item.sku,
                            img: item.image,
                          });
                          dispatch(setTitleImage(item.sku))
                        }}
                        >
                          <div className="flex flex-col justify-center text-center cursor-pointer">
                            
                              
                              <img
                                src={item.image}
                                alt="phto"
                              />
                          
                          </div>
                      </div> 
                      </td>
                      ) : ""}
                      {item.variantOptionSize !== null ? (
                        <td className="p-2 my-2 text-centter">{item.variantOptionSize.name}</td>

                      ) : ""}
                      {item.variantOptionColor !== null ? (
                        <td className="p-2 my-2 text-centter">{item.variantOptionColor.name}</td>
                      ) : ""}
                    <td className="p-2 my-2 text-centter">{item.stock}</td>
                    <td className="p-2 my-2 ">{item.normalPrice}</td>
                    <td className="p-2 my-2">{item.promoPrice ? item.promoPrice : "-"}</td>
                    <td className="p-2 my-2">{item.weight}</td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {modalImage ? (
          <ModalImage
          onCancel={({ showModal }) => {
            Action.changeModalImage(dispatch, { showModal: showModal });
          }}
          title={titleImage}
          img={srcImage}
          />
        ) : null}
      </div>
    </>
  );
};

export default ModalDetail;
