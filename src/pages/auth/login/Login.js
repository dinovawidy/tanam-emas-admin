import React, { useEffect, useState } from "react";
import { useTranslation } from "react-multi-lang";
import { NavLink, useNavigate } from "react-router-dom";
import RouteName from "../../../services/routename";
import "./Login.css";
import UseAuth from "../Auth";
import Cookies from "js-cookie";
import EncryptDecrypt from "../../../services/encrypt-decrypt";
import PopupNotification from "../../../components/PopupNotification/PopupNotification";
import Recaptcha from "react-recaptcha";

const SITE_KEY_CAPTCHA = process.env.REACT_APP_SITE_KEY_CAPTCHA;
const Login = () => {
  const navigate = useNavigate();
  const t = useTranslation();
  const [showpass, setShowpass] = useState(false);
  const [rememberme, setRememberme] = useState(true);
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const [popup, setPopup] = useState({
    status: false,
    message: "",
  });
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [count, setCount] = useState(0);
  const [isVerified, setVerified] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    UseAuth.login(formValues, rememberme, popup, setPopup, setCount);
  };

  useEffect(() => {
    let email = Cookies.get("email");
    let password = Cookies.get("password");
    setFormValues({
      ...formValues,
      email: email !== undefined ? EncryptDecrypt.dec(email) : "",
      password: password !== undefined ? EncryptDecrypt.dec(password) : "",
    });
    const isAuthenticated = UseAuth.getUser();
    if (isAuthenticated) {
      const roleId = UseAuth.getRole();

      if (roleId === "SA1") {
        navigate(RouteName.dashboard);
      }
      if (roleId === "MG1") {
        navigate(RouteName.dashboard);
      }
      if (roleId === "MG2") {
        navigate(RouteName.management);
      }
      if (roleId === "MG3") {
        navigate(RouteName.management);
      }
      if (roleId === "ST4") {
        navigate(RouteName.generateqr);
      }
      if (roleId === "ST1") {
        navigate(RouteName.management);
      }
      if (roleId === "ST2") {
        navigate(RouteName.management);
      }
      if (roleId === "ST3") {
        navigate(RouteName.buyback);
      }
    }
  }, []);

  useEffect(() => {
    if (count >= 3) {
      setShowCaptcha(true);
    }
  }, [count]);

  return (
    <>
      <div className="section py-10 px-6 lg:mx-20 md:mx-28">
        <form className="font-medium">
          <div className="pl-2 pt-4">
            <h2 className="text-green-secondary font-bold">
              {t("login.title")}
            </h2>
            <h3>{t("login.subtitle")}</h3>
          </div>

          <label className="relative block mt-6">
            <span className="absolute inset-y-0 left-1.5 flex items-center pl-2">
              <img
                className="h-3.5 w-5 fill-slate-300"
                src={process.env.REACT_APP_ASSETS_IMAGE + "username-icon.svg"}
                alt="username-icon"
              />
            </span>
            <input
              type="text"
              name="email"
              placeholder={t("login.email")}
              onChange={handleChange}
              className="px-3 py-3 pl-10 pr-3 bg-white border shadow-sm placeholder:text-slate-400 block w-full border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              value={formValues.email}
            />
          </label>

          <label className="relative block mt-6">
            <span className="absolute inset-y-0 left-1.5 flex items-center pl-2">
              <img
                className="h-3.5 w-5 fill-slate-300"
                src={process.env.REACT_APP_ASSETS_IMAGE + "password-icon.svg"}
                alt="username-icon"
              />
            </span>
            <input
              type={`${showpass ? "text" : "password"}`}
              name="password"
              placeholder={t("login.password")}
              onChange={handleChange}
              className="px-3 py-3 pl-10 pr-3 bg-white border shadow-sm placeholder:text-slate-400 block w-full border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm txt-green1"
              value={formValues.password}
            />
            <span
              className="absolute inset-y-0 right-1.5 items-center"
              onClick={() => setShowpass(!showpass)}
            >
              <img
                className="h-full w-7 cursor-pointer"
                src={
                  process.env.REACT_APP_ASSETS_IMAGE +
                  "eye-" +
                  (showpass ? "hide" : "show") +
                  ".svg"
                }
                alt="eye-hide"
              />
            </span>
          </label>

          <div className="flex md:flex-row sm:flex-col sm:text-center mt-6 px-2">
            <div className="md:basis-1/2 md:text-left flex">
              <label className="switchSmall2 mr-2">
                <input
                  type="checkbox"
                  name="rememberme"
                  onChange={(e) => setRememberme(e.target.checked)}
                  defaultChecked={true}
                />
                <small></small>
              </label>
              <h4 className="font-semibold">Remember me</h4>
            </div>
            <div className="md:basis-1/2 md:text-right">
              <NavLink
                to={RouteName.forgotpassword}
                className="hover:text-gold-secondary"
              >
                <h4 className="font-semibold opacity-60">
                  {t("login.forgot_password")}
                </h4>
              </NavLink>
            </div>
          </div>

          {showCaptcha ? (
            <div className="mt-6">
              <Recaptcha
                sitekey={SITE_KEY_CAPTCHA}
                render="explicit"
                onloadCallback={() => {
                  setVerified(false);
                }}
                verifyCallback={(response) => {
                  if (response) {
                    setVerified(true);
                    setShowCaptcha(false);
                    setCount(0);
                  }
                }}
              />
            </div>
          ) : (
            ""
          )}

          <div className="pt-12 text-right">
            <button
              onClick={handleLogin}
              disabled={!isVerified}
              className={`button min-w-fit bg-green-tertiary text-green-white text-sm font-bold py-3 px-16 rounded-lg
                ${
                  !isVerified ? "cursor-not-allowed" : "hover:bg-gold-secondary"
                }`}
            >
              {t("login.title").toUpperCase()}
            </button>
          </div>
        </form>
      </div>
      {popup.status ? (
        <PopupNotification
          title={"Cannot log you in"}
          subtitle={popup.message}
          onCancel={() =>
            setPopup({
              status: !popup.status,
              message: "",
            })
          }
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Login;
