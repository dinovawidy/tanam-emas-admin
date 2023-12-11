import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-screen w-screen">
      <div className="pl-16 py-8">
        <img
          className="h-14"
          src={process.env.REACT_APP_ASSETS_IMAGE + "te-logo.svg"}
          alt="Tanam Emas Logo"
        />
      </div>
      <div className="grid md:grid-cols-2 items-center md:px-10">
        <div className="m-2 p-3 hidden md:block lg:block">
          <h1 className="leading-none text-gold-primary font-bold">
            We're glad to <br /> have you back!
          </h1>
          <h3 className="text-green-white pt-5">
            Good day, fellow admin! Let's login to your admin
            <br /> account to view and organize your data.
          </h3>
        </div>
        <div className="m-3 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
