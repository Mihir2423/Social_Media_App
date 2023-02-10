import React from "react";
import Home from "../../assets/img/home.png";
import Noti from "../../assets/img/noti.png";
import Comment from "../../assets//img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import "./navIcon.css";
import { useNavigate } from "react-router-dom";

function NavIcons() {
  const navigate = useNavigate()
  return (
    <div className="navIcons">
      <img onClick={() => navigate("/home")} src={Home} alt="" />
      <UilSetting />
      <img src={Noti} alt="" />
      <img src={Comment} alt="" onClick={() => navigate("/chat")} />
    </div>
  );
}

export default NavIcons;
