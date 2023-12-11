import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-multi-lang";
import { Provider, useDispatch, useSelector } from "react-redux";
import StoreHelper from "../../../services/store-helper";
import reducerSlice from "./redux/Reducer";
import Action from "./redux/Action";
import "../sidebar/Sidebar.css";

const Sidebar = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);

  const MainComponent = () => {
    const show = useSelector((state) => state.reducer.show);
    const pageActive = useSelector((state) => state.reducer.pageActive);
    const menu = useSelector((state) => state.reducer.menu);
    const dispatch = useDispatch();
    const t = useTranslation();

    useEffect(() => {
      Action.getPageActive(dispatch, "");
      Action.getMenu(dispatch, t);
    }, []);

    return (
      <div
        className={`relative text-green-white text-lg duration-700 flex flex-col h-full ${
          show ? "w-52" : "w-10"
        }`}
      >
        <button
          className={`sb-i-c absolute cursor-pointer top-5 w-7 py-2 px-2.5 ${
            !show && "rotate-180"
          }`}
          onClick={() => Action.setMaxMin(dispatch, !show)}
        >
          <img
            src={process.env.REACT_APP_ASSETS_IMAGE + "arrow-expand.svg"}
            alt="arrow-icon"
          />
        </button>

        <div className="text-2xl text-amber-200 py-14">
          <img
            className="h-12"
            src={
              process.env.REACT_APP_ASSETS_IMAGE +
              `${show ? "te-logo.svg" : "te-logogram.svg"}`
            }
            alt="Tanam Emas Logo"
          />
        </div>

        {menu.map((item, index) => (
          <div key={index}>
            {item.route !== "/helpcenter" ? (
              <div className="flex flex-col sb">
                <NavLink
                  to={item.route}
                  className="hover:text-gold-primary py-3"
                  onClick={() => Action.getPageActive(dispatch, item.title)}
                >
                  <div className="flex flex-row gap-x-3 items-center">
                    <img
                      className="h-5 w-5"
                      src={` ${
                        pageActive !== item.title ? item.icon : item.icon_active
                      }`}
                      alt={item.title}
                    />
                    <div className={`${!show && "hidden"} h-5 duration-700 st`}>
                      {item.title}
                    </div>
                  </div>
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-col absolute bottom-0 w-full sb">
                <NavLink
                  to={item.route}
                  className="hover:text-gold-primary py-3"
                  onClick={() => Action.getPageActive(dispatch, item.title)}
                >
                  <div className="flex flex-row gap-x-3 items-center">
                    <img
                      className="h-5 w-5"
                      src={` ${
                        pageActive !== item.title ? item.icon : item.icon_active
                      }`}
                      alt={item.title}
                    />
                    <div className={`${!show && "hidden"} h-5 duration-700 st`}>
                      {item.title}
                    </div>
                  </div>
                </NavLink>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default Sidebar;
