import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import UseAuth from "../../pages/auth/Auth";
import StoreHelper from "../../services/store-helper";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";
import { useTranslation } from "react-multi-lang";
import { NavLink } from "react-router-dom";
import RouteName from "../../services/routename";
import GeneralUtility from "../../utils/general-utility";

const ProfilDropdown = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const dispatch = useDispatch();
    const t = useTranslation();
    const showDropdown = useSelector((state) => state.reducer.showDropdown);
    const data = useSelector((state) => state.reducer.data);
    const currentUser = UseAuth.getUser();
    const currentPhoto = UseAuth.getPhoto();

    
    useEffect(() => {
      Action.getBalance(dispatch);
    }, []);
    return (
      <div className="relative">
        <div
          className="flex flex-row items-center text-left"
          onClick={() => {
            Action.changeShowNotif(store, { show: !showDropdown });
          }}
        >
          <div className="header-profil h-8 w-8 text-center">
            {currentPhoto !== "" ? (
              <img
                className="h-full rounded-lg"
                src={currentPhoto}
                alt={currentUser.nameAdmin}
              />
            ) : (
              <div className="text-xl text-white">
                {/* {currentUser.nameAdmin.slice(0, 1)} */}
              </div>
            )}
          </div>
          <div className="flex-col pl-2">
            <div className="font-bold text-md">{currentUser.nameAdmin}</div>
            <div className="text-sm text-gray-secondary">
              {currentUser.roleName}
            </div>
          </div>
        </div>
        {showDropdown ? (
          <div className="absolute mt-6 section-grey b-0 -right-6 w-[16rem] max-h-[13rem] z-10">
            <div className="p-4">
              <div className="font-bold">{currentUser.nameAdmin}</div>
              <div className="text-sm text-gray-secondary">
                {currentUser.level}
              </div>

              <div className="flex flex-row items-center font-semibold pt-1">
                <div className="flex-1">{t("general.admin_id")}</div>
                <div>{currentUser.roleId}</div>
              </div>
            </div>
            <hr />
            <div className="p-4">
              {UseAuth.checkFunction("balance-admin-page", "function") === true ? (
                <NavLink to={RouteName.balance}>
                <div className="flex flex-row items-center gap-x-3 font-medium mb-4">
                  <div className="w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25.751"
                      height="15.515"
                      viewBox="0 0 25.751 15.515"
                    >
                      <g
                        id="Group_33353"
                        data-name="Group 33353"
                        transform="translate(-558.137 -833.815)"
                      >
                        <circle
                          id="Ellipse_304-2"
                          data-name="Ellipse 304-2"
                          cx="3.442"
                          cy="3.442"
                          r="3.442"
                          transform="translate(567.57 838.131)"
                          fill="none"
                          stroke="#5d7d73"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Ellipse_304-2-2"
                          data-name="Ellipse 304-2"
                          d="M578.046,848.58a5.092,5.092,0,0,1,5.092-5.092"
                          fill="none"
                          stroke="#5d7d73"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          opacity="0.6"
                        />
                        <path
                          id="Ellipse_304-2-3"
                          data-name="Ellipse 304-2"
                          d="M583.138,839.657a5.092,5.092,0,0,1-5.092-5.092"
                          fill="none"
                          stroke="#5d7d73"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          opacity="0.6"
                        />
                        <path
                          id="Ellipse_304-2-4"
                          data-name="Ellipse 304-2"
                          d="M558.887,843.488a5.092,5.092,0,0,1,5.092,5.092"
                          fill="none"
                          stroke="#5d7d73"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          opacity="0.6"
                        />
                        <path
                          id="Ellipse_304-2-5"
                          data-name="Ellipse 304-2"
                          d="M563.979,834.565a5.092,5.092,0,0,1-5.092,5.092"
                          fill="none"
                          stroke="#5d7d73"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          opacity="0.6"
                        />
                        <rect
                          id="Rectangle_369-2"
                          data-name="Rectangle 369-2"
                          width="24.251"
                          height="14.015"
                          rx="2"
                          transform="translate(558.887 834.565)"
                          fill="none"
                          stroke="#5d7d73"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="w-20">{t("balance.title")}</div>
                  <div className="flex-1 text-right">Rp{GeneralUtility.addCommas(data)}</div>
                </div>
              </NavLink>
              ) : ""}
              <NavLink to={RouteName.accountsettings}>
                <div className="flex flex-row items-center gap-x-3 font-medium">
                  <div className="w-5">
                    <img
                      className="h-5 w-full"
                      src={
                        process.env.REACT_APP_ASSETS_IMAGE + "settings-icon.svg"
                      }
                      alt="settings"
                    />
                  </div>
                  <div>{t("general.account_settings")}</div>
                </div>
              </NavLink>
              <div
                className="flex flex-row items-center gap-x-3 font-medium cursor-pointer pt-3"
                onClick={() => {
                  UseAuth.logout();
                }}
              >
                <div className="w-5">
                  <img
                    className="pl-0.5 h-6 w-full"
                    src={process.env.REACT_APP_ASSETS_IMAGE + "logout-icon.svg"}
                    alt="logout"
                  />
                </div>
                <div>{t("general.logout")}</div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default ProfilDropdown;
