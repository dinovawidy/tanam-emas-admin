import { useEffect, React } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { setTranslations, setDefaultLanguage } from "react-multi-lang";
import AppLayout from "../../components/layout/applayout/AppLayout";
import AuthLayout from "../../components/layout/authlayout/AuthLayout";
import RouteName from "../../services/routename";
import StoreHelper from "../../services/store-helper";
import AccountSettings from "../accountsettings/AccountSettings";
import AppCustomization from "../appcustomization/AppCustomization";
import UseAuth from "../auth/Auth";
import ForgotPassword from "../auth/forgotpassword/ForgotPassword";
import Login from "../auth/login/Login";
import NewPassword from "../auth/newpassword/NewPassword";
import Dashboard from "../dashboard/Dashboard";
import GenerateQR from "../generateqr/GenerateQR";
import HelpCenter from "../helpcenter/HelpCenter";
import Management from "../management/Management";
import NotFound from "../notfound/NotFound";
import reducerSlice from "./redux/Reducer";
import en from "../../translations/en.json";
import id from "../../translations/id.json";
import Action from "./redux/Action";
import Privacy from "../privacy/Privacy";
import Cookies from "js-cookie";
import Balance from "../balance/Balance";
import ContactUs from "../contactus/ContactUs";

const MainComponent = () => {
  const translation = useSelector((state) => state.reducer.translation);
  const dispatch = useDispatch();
  const isAuthenticated = UseAuth.getRole();
  setTranslations({ en, id });
  setDefaultLanguage(translation);

  useEffect(() => {
    Cookies.set("language", translation);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={RouteName.login} element={<Login />} />
            <Route
              path={RouteName.forgotpassword}
              element={<ForgotPassword />}
            />
            <Route path={RouteName.newpassword} element={<NewPassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />

          <Route path={RouteName.privacy} element={<Privacy />} />
          <Route path={RouteName.contactus} element={<ContactUs />} />

          {isAuthenticated !== "" ? (
            <Route element={<AppLayout />}>
              {UseAuth.checkFunction("dashboard-page", "function") ? (
                <Route
                  path={RouteName.dashboard}
                  element={
                    <Dashboard
                      getBreadcrums={(title) => {
                        Action.getBreadcrums(
                          dispatch,
                          title,
                          RouteName.dashboard
                        );
                      }}
                    />
                  }
                />
              ) : null}

              {UseAuth.checkFunction("management-merchant-page", "function") ||
              UseAuth.checkFunction("management-admin-page", "function") ||
              UseAuth.checkFunction("management-customer-page", "function") ||
              UseAuth.checkFunction(
                "management-merchant-request-page",
                "function"
              ) ||
              UseAuth.checkFunction("managament-product-page", "function") ? (
                <Route
                  path={RouteName.management}
                  element={
                    <Management
                      getBreadcrums={(title) => {
                        Action.getBreadcrums(
                          dispatch,
                          title,
                          RouteName.management
                        );
                      }}
                    />
                  }
                />
              ) : null}

              {UseAuth.checkFunction("generateqr-page", "function") ? (
                <Route
                  path={RouteName.generateqr}
                  element={
                    <GenerateQR
                      getBreadcrums={(title) => {
                        Action.getBreadcrums(
                          dispatch,
                          title,
                          RouteName.generateqr
                        );
                      }}
                    />
                  }
                />
              ) : null}

              {UseAuth.checkFunction("helpcenter-page", "function") ? (
                <Route
                  path={RouteName.helpcenter}
                  element={
                    <HelpCenter
                      getBreadcrums={(title) => {
                        Action.getBreadcrums(
                          dispatch,
                          title,
                          RouteName.helpcenter
                        );
                      }}
                    />
                  }
                />
              ) : null}
              <Route
                path={RouteName.accountsettings}
                element={
                  <AccountSettings
                    getBreadcrums={(title) => {
                      Action.getBreadcrums(
                        dispatch,
                        title,
                        RouteName.accountsettings
                      );
                    }}
                  />
                }
              />

              {UseAuth.checkFunction("appcustomization-page", "function") ? (
                <Route
                  path={RouteName.appcustomization}
                  element={
                    <AppCustomization
                      getBreadcrums={(title) => {
                        Action.getBreadcrums(
                          dispatch,
                          title,
                          RouteName.appcustomization
                        );
                      }}
                    />
                  }
                />
              ) : null}

              <Route
                path={RouteName.balance}
                element={
                  <Balance
                    getBreadcrums={(title) => {
                      Action.getBreadcrums(dispatch, title, RouteName.balance);
                    }}
                  />
                }
              />
            </Route>
          ) : (
            ""
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

const Base = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default Base;
