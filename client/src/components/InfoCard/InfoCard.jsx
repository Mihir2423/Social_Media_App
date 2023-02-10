import React from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import "./InfoCard.css";
import {useDispatch} from "react-redux"
import {LOGOUT} from "../../redux/types"
import { useNavigate } from "react-router-dom";

function InfoCard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch({ type: LOGOUT });

    navigate('/auth');
  };
  return (
    <div className="InfoCard bounce-in-top">
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <UilPen width="2rem" height="1.2rem" />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>in Relationship</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Multan</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>Zainkeepscode inst</span>
      </div>

      <button className="button logout-button" onClick={logout}>Logout</button>
    </div>
  );
}

export default InfoCard;
