import React from "react";
import {Followers, InfoCard, Logo} from "../"
import "./ProfileLeft.css"

function ProfileLeft() {
  return (
    <div className="ProfileSide">
      <Logo />
      <InfoCard />
      <Followers />
    </div>
  );
}

export default ProfileLeft;
