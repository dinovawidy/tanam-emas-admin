import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useDispatch, useSelector } from "react-redux";
import UploadImage from "../../components/UploadImage/UploadImage";
import StoreHelper from "../../services/store-helper";
import reducerSlice, { setAddForm, setLoadingButton } from "./redux/Reducer";
import Action from "./redux/Action";
import ButtonWhite from "../../components/ButtonWhite/ButtonWhite";
import UseAuth from "../auth/Auth";
import ButtonGreen from "../../components/ButtonGreen/ButtonGreen";

const AppCustomization = ({ getBreadcrums }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);

  const MainComponent = () => {
    const t = useTranslation();
    const dispatch = useDispatch();
    store.getState();
    const addForm = useSelector((state) => state.reducer.addForm);
    const loadingButton = useSelector((state) => state.reducer.loadingButton);
    

    useEffect(() => {
      getBreadcrums(t("appcustomization.title"));
      Action.getList(dispatch);
    }, []);
    return (
      <>
        <div className="flex flex-row items-center px-2 gap-x-2">
          <i className="mt-1.5">
            <img
              className="h-full w-10"
              src={process.env.REACT_APP_ASSETS_IMAGE + "back-icon.svg"}
              alt="back-icon"
            />
          </i>
          <h2 className="text-green-primary font-bold">
            {t("appcustomization.title")}
          </h2>
        </div>

        <div className="flex flex-row gap-x-3 pt-3">
          <div className="bg-gray-primary rounded-xl w-72 text-lg h-fit">
            <div className="cursor-pointer">
              <div className="font-semibold bg-white rounded-xl p-4 leading-tight flex flex-row">
                <div className="pl-3 flex-1">
                  {t("appcustomization.subtitle")}
                </div>
                <div className="flex text-right">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-gray-primary rounded-xl">
            <div className="px-5 py-3 text-md ">
              <div className="opacity-60 font-bold pb-3">
                {t("appcustomization.subtitle").toUpperCase()}
              </div>

              <div className="h-[29rem] overflow-y-auto">
                {/* hero banner */}
                <div className="flex flex-row gap-x-4 py-2">
                  <div className="flex-1">
                    <div className="text-lg font-bold">
                      {t("appcustomization.hero_banner")}
                    </div>
                    <div className="opacity-40">
                      {t("appcustomization.support_files")} jpeg,jpg,png
                    </div>
                    <div className="opacity-40">
                      {t("appcustomization.dimension")} 414x160px
                    </div>
                    <div className="opacity-40">
                      {t("appcustomization.max_size")} 2Mb
                    </div>
                  </div>
                  <div className="flex flex-col w-[25rem]">
                    {/* banner 1 */}
                    <div className="w-full">
                      <UploadImage
                        img={addForm.imageHero1 ? addForm.imageHero1 : ""}
                        aspectRatio={207 / 80}
                        name={"Banner_1"}
                        height={40}
                        width={40}
                        position={"col"}
                        onClick={(image, name) => {
                          dispatch(
                            setAddForm({
                              ...addForm,
                              imageHero1: image,
                              imageHero1name: name,
                            })
                          );
                        }}
                        onDelete={() => {
                          dispatch(
                            setAddForm({
                              ...addForm,
                              imageHero1: "",
                              imageHero1name: "",
                            })
                          );
                        }}
                      />
                    </div>

                    {/* banner 2 */}
                    <div className="w-full pt-2">
                      <UploadImage
                        img={addForm.imageHero2 ? addForm.imageHero2 : ""}
                        aspectRatio={207 / 80}
                        height={40}
                        width={40}
                        name={"Banner_2"}
                        position={"col"}
                        onClick={(image, name) => {
                          dispatch(
                            setAddForm({
                              ...addForm,
                              imageHero2: image,
                              imageHero2name: name,
                            })
                          );
                        }}
                        onDelete={() => {
                          dispatch(
                            setAddForm({
                              ...addForm,
                              imageHero2: "",
                              imageHero2name: "",
                            })
                          );
                        }}
                      />
                    </div>

                    {/* banner 3 */}
                    <div className="w-full">
                      <UploadImage
                        img={addForm.imageHero3 ? addForm.imageHero3 : ""}
                        aspectRatio={207 / 80}
                        height={40}
                        width={40}
                        name={"Banner_3"}
                        position={"col"}
                        onClick={(image, name) => {
                          dispatch(
                            setAddForm({
                              ...addForm,
                              imageHero3: image,
                              imageHero3name: name,
                            })
                          );
                        }}
                        onDelete={() => {
                          dispatch(
                            setAddForm({
                              ...addForm,
                              imageHero3: "",
                              imageHero3name: "",
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* buyback banner */}
                <div className="flex flex-row gap-x-4 pt-5">
                  <div className="flex-1">
                    <div className="text-lg font-bold">
                      {t("appcustomization.buyback_banner")}
                    </div>
                    <div className="opacity-40">
                      {t("appcustomization.support_files")} jpeg,jpg,png
                    </div>
                    <div className="opacity-40">
                      {t("appcustomization.dimension")} 382x130px
                    </div>
                    <div className="opacity-40">
                      {t("appcustomization.max_size")} 2Mb
                    </div>
                  </div>
                  <div className="w-[25rem]">
                    <div className="">
                      <UploadImage
                        img={addForm.imageBuyback}
                        aspectRatio={191 / 65}
                        height={40}
                        width={40}
                        name={"Buyback_1"}
                        onClick={(image, name) => {
                          dispatch(
                            setAddForm({
                              ...addForm,
                              imageBuyback: image,
                              imageBuybackname: name,
                            })
                          );
                        }}
                        onDelete={() => {
                          dispatch(
                            setAddForm({
                              ...addForm,
                              imageBuyback: "",
                              imageBuybackname: "",
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row-reverse gap-x-2 pt-5 pb-3">
                  {UseAuth.checkFunction("save-appcustomization-button", "button") === true ? (
                    <>
                    {/* <button
                      onClick={(e) => {
                        Action.handleSubmit(dispatch, e, addForm);
                        //dispatch(setValidatePass(true));
                      }}
                      className="button md:w-36 hover:bg-gray-primary text-white border-2 hover:text-green-quaternary border-green-secondary text-xs tracking-widest bg-green-secondary font-bold py-3 rounded-xl"
                    >
                      {t("general.save").toUpperCase()}
                    </button> */}

              <ButtonGreen
                title={t("general.save").toUpperCase()}
                onClick={(e) => {
                  Action.handleSubmit(dispatch, e, addForm, setLoadingButton);
                }}
                disabled={loadingButton}
                />
                    
  
                    <ButtonWhite
                      title={t("accountsettings.cancel")}
                      onClick={() => {
                        Action.getList(dispatch);
                      }}
                    />
                    </>
                  ) : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default AppCustomization;
