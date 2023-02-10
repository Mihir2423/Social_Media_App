import React from "react";
import siteLogo from "../../assets/img/971.jpg";
import {UilSearch} from "@iconscout/react-unicons";
import "./Logo.css";

function Logo() {
  return (
    <div className="LogoSearch">
      <img className="site-logo" src={siteLogo} alt="" />
      <div className="Search">
        <input type="text" placeholder="#Explore" color="inherit" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
}

export default Logo;
