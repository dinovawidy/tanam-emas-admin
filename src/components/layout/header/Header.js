import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import NotificationHeader from "../../Notification/NotificationHeader";
import { useDispatch, useSelector } from "react-redux";
import Action from "../../../pages/base/redux/Action";
import ProfilDropdown from "../../ProfilDropdown/ProfilDropdown";

const Header = () => {
  const dispatch = useDispatch();
  const breadcrums = useSelector((state) => state.reducer.breadcrums);
  return (
    <div className="flex flex-row items-center h-14 pb-2">
      <div className="pl-5 flex-1 text-green-primary font-semibold text-md">
        {breadcrums.map((item, index) => (
          <div key={index}>
            <NavLink to={item.Link}>{item.title}</NavLink>
          </div>
        ))}
      </div>
      <div className="flex bg-gray-primary rounded-xl items-center gap-x-6 py-2 px-6">
        <NotificationHeader />
        <div className="header-multilang">
          <select
            className="py-1 px-2 w-16 text-sm"
            name="multi-lang"
            id="menu-items"
            onChange={(e) => {
              Action.changeTranslation(dispatch, e.target.value);
            }}
          >
            <option value="en">EN</option>
            <option value="id">ID</option>
          </select>
        </div>
        <ProfilDropdown />
      </div>
    </div>
  );
};

export default Header;
