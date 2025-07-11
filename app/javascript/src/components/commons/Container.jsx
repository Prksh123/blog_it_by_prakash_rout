import React, { useState } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import SideBar from "./SideBar";
import SidePanel from "./SidePanel";
// import NavBar from "components/NavBar";

const Container = ({ children, className = "" }) => {
  const [showPanel, setShowPanel] = useState(false);

  const handlePanel = () => {
    setShowPanel(prev => !prev);
  };

  return (
    <div className="flex h-screen w-screen">
      <SideBar showPanel={handlePanel} />
      {showPanel && <SidePanel />}
      <div className="flex h-screen w-full overflow-y-auto px-6">
        <div className={classnames("flex-1", className)}>{children}</div>
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
