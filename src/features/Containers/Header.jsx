import { themeChange } from "theme-change";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {BsBellFill} from 'react-icons/bs'
import{FaBars} from 'react-icons/fa'

import { openRightDrawer } from "../../app/Slices/Dashboard/RightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../Utils/GlobalUtilConstant";
import ProfileImg from '../../assests/saud.jpeg'
import { NavLink, Routes, Link, useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageTitle } = useSelector((state) => state.header);
  const { notificationlength } = useSelector((state) => state.notification);

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
    // 👆 false parameter is required for react project
  }, []);

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  function logoutUser() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <FaBars className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
        </div>

        <div className="order-last">
          {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}
          {/* <select
            className="select mr-4 border-2 border-accent"
            data-choose-theme
          >
            <option disabled defaultChecked>
              Theme
            </option>
            <option value="customTheme">Default</option>
            <option value="darkcustom">Custom Dark</option>
            <option value="dark">Dark</option>
            <option value="cupcake">Cupcake</option>
            <option value="dracula">Dracula</option>
            <option value="night">Night</option>
            <option value="synthwave">Synthwave</option>
            <option value="aqua">Aqua</option>
            <option value="luxury">Luxury</option>
            <option value="lofi">Lofi</option>
          </select>  */}

          {/* Light and dark theme selection toogle **/}
          {/* <label className="swap ">
                <input type="checkbox"/>
                <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
            </label> */}

          {/* Notification icon */}
          <button
            className="btn btn-ghost ml-4  btn-circle"
            onClick={() => openNotification()}
          >
            <div className="indicator">
              <BsBellFill className="h-6 w-6" />
              {notificationlength > 0 ? (
                <span className="indicator-item badge badge-secondary badge-sm">
                  {notificationlength}
                </span>
              ) : null}
            </div>
          </button>

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={ProfileImg} alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link to={"/app/profile"}>
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <Suspense fallback={<div>Loading..</div>}>
                  <NavLink to="/login">Logout</NavLink>
                </Suspense>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
