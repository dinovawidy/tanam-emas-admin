import React, { useState } from "react";
import { useTranslation } from "react-multi-lang";
import { NavLink } from "react-router-dom";
import RouteName from "../../../services/routename";
import UseAuth from "../Auth";
import Recaptcha from "react-recaptcha";

const MAX_ATTEMPTS = 3;

const SITE_KEY_CAPTCHA = process.env.REACT_APP_SITE_KEY_CAPTCHA;
const ForgotPassword = () => {
  const [attempts, setAttempts] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const t = useTranslation();

  //specifying your onload callback function
  let onloadCallback = function () {
    setAttempts(0);
    setShowCaptcha(true);
  };

  // specifying verify callback function
  let verifyCallback = function (response) {
    if (response) {
      setIsVerified(true);
    }
  };

  const handleChangeCaptcha = (isChecked) => {
    setIsVerified(isChecked);
  };

  const validationEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.toLowerCase());
  };
  const handleForgotpass = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is Required");
    } else if (!validationEmail(email)) {
      setError("Please enter a valid email address");
    } else {
      const data = {
        email: email,
      };
      await UseAuth.forgotPassword(data, setError, setShowCaptcha, setEmail, setIsVerified);

      setAttempts((prevAttempts) => prevAttempts + 1);
      if (attempts === MAX_ATTEMPTS - 1) {
        setShowCaptcha(true);
      } else if (isVerified) {
        const data = {
          email: email,
        };
        await UseAuth.forgotPassword(data, setError, setShowCaptcha, setEmail, setIsVerified);
        setButtonDisabled(false);
        //  setShowCaptcha(false)
        console.log("show1", showCaptcha);
        if (!isVerified) {
          setError("Please check your captcha box");
          setButtonDisabled(true);
        }
      } else {
       
      }
    }
  };

  return (
    <div className="section py-10 px-6 lg:mx-20 md:mx-28">
      <NavLink to={RouteName.login} className="">
        <img src={process.env.REACT_APP_ASSETS_IMAGE + "back-icon-auth.svg"} />
      </NavLink>
      <form>
        <h2 className="txt-green1 font-bold pl-2 pt-6">
          {t("forgotpassword.title")}
        </h2>
        <h3 className="font-medium pl-2 pt-4">
          {t("forgotpassword.subtitle")}
        </h3>

        <label className="relative block mt-6">
          <span className="absolute inset-y-0 left-1.5 flex items-center pl-2">
            <img
              className="h-3.5 w-5 fill-slate-300"
              src={process.env.REACT_APP_ASSETS_IMAGE + "username-icon.svg"}
              alt="username-icon"
            />
          </span>
          <input
            type="email"
            placeholder={t("forgotpassword.email")}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-3 pl-10 pr-3 bg-white border shadow-sm placeholder:text-slate-400 block w-full border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            value={email}
          />
        </label>
        {error && (
          <div
            className="text-red-800 rounded-lg dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        )}

        {showCaptcha === true ? (
          <div>
            <Recaptcha
              sitekey={SITE_KEY_CAPTCHA}
              render="explicit"
              verifyCallback={verifyCallback}
              onloadCallback={onloadCallback}
              onChange={handleChangeCaptcha}
            />
          </div>
        ) : (
          
          ""
        )}

        <div className="pt-12 text-right">
          <button
            onClick={handleForgotpass}
            disabled={showCaptcha === true && !isVerified}
            className={`${
              showCaptcha === true && !isVerified
                ? ""
                : "hover:bg-gold-secondary"
            } button min-w-fit bg-green-tertiary text-green-white text-sm font-bold py-3 px-16 rounded-lg `}
          >
            {t("forgotpassword.button").toUpperCase()}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
