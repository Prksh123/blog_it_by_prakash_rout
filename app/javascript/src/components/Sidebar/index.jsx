import React, { useRef } from "react";

import { Edit, List, ListDetails, Folder } from "@bigbinary/neeto-icons";
import { Popover, Typography } from "@bigbinary/neetoui";
import { resetAuthTokens } from "apis/axios";
import { Link } from "react-router-dom";

import authApi from "../../apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage";
import Button from "../commons/Button";

const SideBar = ({ showPanel }) => {
  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail");
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
          src="https://img.icons8.com/?size=100&id=tz1GQBtNqT2P&format=png&color=000000"
        />
        <Link to="/">
          <List className="h-6 w-6 cursor-pointer" />
        </Link>
        <Link to="/posts/create">
          <Edit className="h-6 w-6 cursor-pointer" />
        </Link>
        {window.location.pathname === "/" && (
          <ListDetails className="h-6 w-6 cursor-pointer" onClick={showPanel} />
        )}
        <Link to="/my-blogs">
          <Folder className="h-6 w-6 cursor-pointer" />
        </Link>
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
            <Typography className="text-center" style="body1" weight="semibold">
              {userName}
            </Typography>
            <Typography style="body1" weight="medium">
              {userEmail}
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
