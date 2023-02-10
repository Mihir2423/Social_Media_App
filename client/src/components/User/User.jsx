import React from "react";
import Profile from "../../assets/images/defaultProfile.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUserAction, unfollowUserAction } from "../../redux/actions/user";

function User({ follower, formatEmail }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const [following, setFollowing] = React.useState(
    user.oldUser.following?.includes(follower._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUserAction(follower._id, user.oldUser._id))
      : dispatch(followUserAction(follower._id, user.oldUser._id));
    setFollowing((prev) => !prev);
  };

  return (
    <div>
      <div key={follower._id} className="follower">
        <div
          onClick={() => navigate(`/Profile/${follower._id}`)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={follower.profilePic || Profile}
            alt=""
            className="followerImage"
          />
          <div className="name">
            <span>{follower.name}</span>
            <span>@{formatEmail(follower.email)}</span>
          </div>
        </div>
        <button
          className={
            following ? "button fc-button UnfollowButton" : "button fc-button"
          }
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default User;
