import React, { useRef } from "react";

import { Popover, Typography } from "@bigbinary/neetoui";
import { resetAuthTokens } from "apis/axios";
import { Link } from "react-router-dom";

import Button from "./Button";

import authApi from "../../apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage";

const SideBar = ({ showPanel }) => {
  const userName = getFromLocalStorage("authUserName");
  const avatarRef = useRef(null);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex h-screen w-20 flex-col items-center justify-between border-r bg-slate-50 py-7">
      <div className="flex flex-col gap-8">
        <img
          alt="Not showing"
          className="h-5 w-5"
          src="https://cdn-icons-png.flaticon.com/128/582/582929.png"
        />
        <Link to="/">
          <img
            alt="Not showing"
            className="h-5 w-5"
            src="https://cdn-icons-png.flaticon.com/128/17433/17433939.png"
          />
        </Link>
        <Link to="/posts/create">
          <img
            alt="Not showing"
            className="h-5 w-5"
            src="https://cdn-icons-png.flaticon.com/128/16/16941.png"
          />
        </Link>
        <img
          alt="Not showing"
          className="h-5 w-5"
          src="https://cdn-icons-png.flaticon.com/128/324/324687.png"
          onClick={showPanel}
        />
      </div>
      <div className="flex flex-col items-center">
        <img
          alt="Not showing"
          className="h-7 w-7"
          ref={avatarRef}
          src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
        />
        <Popover className="w-auto" position="right" reference={avatarRef}>
          <div className="flex flex-col gap-1 px-2 py-4">
            <Typography style="body1" weight="medium">
              {userName}
            </Typography>
            <Button
              buttonText="Logout"
              style="primary"
              onClick={handleLogout}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default SideBar;
