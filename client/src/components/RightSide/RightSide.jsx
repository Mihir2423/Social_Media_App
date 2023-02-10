import React from 'react'
import "./RightSide.css";
import Home from "../../assets/img/home.png";
import Noti from "../../assets/img/noti.png";
import Comment from "../../assets/img/Comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import {ShareModal, TrendCard} from "../"
import "./RightSide.css"
import { useNavigate } from 'react-router-dom';

function RightSide() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <img onClick={()=> navigate("/")} src={Home} alt="" />
        <UilSetting />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" onClick={()=> navigate("/chat")}/>
      </div>

      <TrendCard />

      <button className="button r-button" onClick={handleOpen}>
        Share
      </button>
      <ShareModal open={open} handleClose={handleClose} />
    </div>
  )
}

export default RightSide
