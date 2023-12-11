import UseAuth from "../../../../pages/auth/Auth";
import RouteName from "../../../../services/routename";
import { setShow, setPageActive, setMenu } from "./Reducer";

const setMaxMin = async (dispatch, show) => {
  dispatch(setShow(show));
};

const getPageActive = async (dispatch, page) => {
  dispatch(setPageActive(page));
};

const getMenu = async (dispatch, t) => {
  let menu = [];
  const dashboard = {
    title: t("dashboard.title"),
    icon: process.env.REACT_APP_ASSETS_IMAGE + "dashboard-icon.svg",
    icon_active:
      process.env.REACT_APP_ASSETS_IMAGE + "dashboard-icon-active.svg",
    route: RouteName.dashboard,
  };

  const management = {
    title: t("management.title"),
    icon: process.env.REACT_APP_ASSETS_IMAGE + "management-icon.svg",
    icon_active:
      process.env.REACT_APP_ASSETS_IMAGE + "management-icon-active.svg",
    route: RouteName.management,
  };

  // const buyback = {
  //   title: t("buyback.title"),
  //   icon: process.env.REACT_APP_ASSETS_IMAGE + "buyback-icon.svg",
  //   icon_active: process.env.REACT_APP_ASSETS_IMAGE + "buyback-icon-active.svg",
  //   route: RouteName.buyback,
  // };

  // const goldpickup = {
  //   title: t("goldpickup.title"),
  //   icon: process.env.REACT_APP_ASSETS_IMAGE + "goldpickup-icon.svg",
  //   icon_active:
  //     process.env.REACT_APP_ASSETS_IMAGE + "goldpickup-icon-active.svg",
  //   route: RouteName.goldpickup,
  // };

  // const goldpricing = {
  //   title: t("goldpricing.title"),
  //   icon: process.env.REACT_APP_ASSETS_IMAGE + "goldpricing-icon.svg",
  //   icon_active:
  //     process.env.REACT_APP_ASSETS_IMAGE + "goldpricing-icon-active.svg",
  //   route: RouteName.goldpricing,
  // };

  const generateqr = {
    title: t("generateqr.title"),
    icon: process.env.REACT_APP_ASSETS_IMAGE + "qrcode-icon.svg",
    icon_active: process.env.REACT_APP_ASSETS_IMAGE + "qrcode-icon-active.svg",
    route: RouteName.generateqr,
  };

  const appcustomization = {
    title: t("appcustomization.title"),
    icon: process.env.REACT_APP_ASSETS_IMAGE + "appcustomization-icon.svg",
    icon_active:
      process.env.REACT_APP_ASSETS_IMAGE + "appcustomization-icon-active.svg",
    route: RouteName.appcustomization,
  };

  const helpcenter = {
    title: t("helpcenter.title"),
    icon: process.env.REACT_APP_ASSETS_IMAGE + "help-center-icon.svg",
    icon_active: process.env.REACT_APP_ASSETS_IMAGE + "help-center-icon-active.svg",
    route: RouteName.helpcenter,
  };

  if (UseAuth.checkFunction("dashboard-page", "function")) {
    menu.push(dashboard);
  }
  if (
    UseAuth.checkFunction("management-merchant-page", "function") ||
    UseAuth.checkFunction("management-admin-page", "function") ||
    UseAuth.checkFunction("management-customer-page", "function") ||
    UseAuth.checkFunction("management-merchant-request-page", "function") ||
    UseAuth.checkFunction("managament-product-page", "function")
  ) {
    menu.push(management);
  }
  // if (UseAuth.checkFunction("buyback-page", "function")) {
  //   menu.push(buyback);
  // }
  // if (UseAuth.checkFunction("goldpickup-page", "function")) {
  //   menu.push(goldpickup);
  // }
  // if (UseAuth.checkFunction("goldpricing-page", "function")) {
  //   menu.push(goldpricing);
  // }
  if (UseAuth.checkFunction("generateqr-page", "function")) {
    menu.push(generateqr);
  }
  if (UseAuth.checkFunction("appcustomization-page", "function")) {
    menu.push(appcustomization);
  }
  if (UseAuth.checkFunction("helpcenter-page", "function")) {
    menu.push(helpcenter);
  }
  dispatch(setMenu(menu));
};

const Action = {
  setMaxMin,
  getPageActive,
  getMenu,
};

export default Action;
