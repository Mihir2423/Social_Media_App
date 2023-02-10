import React from "react";
import {Followers, Logo, ProfileCard} from "../index"
import "./ProfileSide.css"

function ProfileSide() {
  return (
    <div className="ProfileSide">
      <Logo />
      <ProfileCard location = "HomePage" />
      <Followers/>
    </div>
  );
}

export default ProfileSide;
