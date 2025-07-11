import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

import { getFromLocalStorage } from "../../utils/storage";

const SideBar = ({ showPanel }) => {
  const username = getFromLocalStorage("authUserName");

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
          src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
        />
        <Typography>{username}</Typography>
      </div>
    </div>
  );
};

export default SideBar;
