import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import SideBar from "./SideBar";
// import NavBar from "components/NavBar";

const Container = ({ children, className = "" }) => (
  <div className="flex h-screen w-screen gap-4">
    <SideBar />
    <div className="flex h-screen w-full overflow-y-auto px-6">
      <div className={classnames("flex-1", className)}>{children}</div>
    </div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
