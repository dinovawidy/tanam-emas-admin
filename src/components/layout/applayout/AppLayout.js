import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

const AppLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex">
      <div className="flex pl-3 ml-3 my-3 py-3">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col section m-3 p-3 w-[100vh]">
        <Header />
        <div className="p-1 h-[100vh] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
