import React from "react";

import { Link } from "react-router-dom";

const SideBar = ({ showPanel }) => (
  <div className="flex h-screen w-20 flex-col items-center justify-between border-r bg-slate-50 py-7">
    <div className="flex flex-col gap-8">
      <img
        alt="Not showing"
        className="h-5 w-5"
        src="https://cdn-icons-png.flaticon.com/128/582/582929.png"
      />
      <Link to="/dashboard">
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
    <div>
      <img
        alt="Not showing"
        className="h-7 w-7"
        src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
      />
    </div>
  </div>
);

export default SideBar;
