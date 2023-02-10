import React from "react";
import "./Followers.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction } from "../../redux/actions/user";
import User from "../User/User"

function FollowersCard() {
  const disptach = useDispatch();
  const resData = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.auth.authData);
  let filteredData = resData;
  filteredData = resData.filter((user) => user._id !== userInfo.oldUser._id);
  React.useEffect(() => {
    disptach(getAllUserAction());
  }, []);

  function formatEmail(email) {
    const [first, last] = email.split("@");
    const abbreviatedName = first.slice(0, 3) + "..." 
    const [name, domain] = last.split(".");
    const abbreviateLast = name.slice(0,1) + ".."
    const abbreviatedEmail = abbreviatedName + "@"  + abbreviateLast + "." + domain;
    return abbreviatedEmail
  }
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {filteredData.map((follower) => {
        return (
          <User key={follower._id} follower = {follower} formatEmail = {formatEmail} userInfo = {userInfo} />
        );
      })}
    </div>
  );
}

export default FollowersCard;
