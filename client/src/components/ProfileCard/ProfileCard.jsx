import React from "react";
import "./ProfileCard.css";
import Cover from "../../assets/images/defaultCover.jpg";
import Profile from "../../assets/images/defaultProfile.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/actions/user";

function ProfileCard({ location }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  function handleClick() {
    navigate(`/Profile/${userInfo.oldUser._id}`);
  }
  const userInfo = useSelector((state) => state.auth.authData);
  const currUser = useSelector((state) => state.currUser);
  const posts = useSelector((state) => state.post);
  const result = posts.filter((post) => post.userId === id)?.length;

  React.useEffect(() => {
    if (id) {
      dispatch(getCurrentUser(id));
    } else {
      dispatch(getCurrentUser(userInfo?.oldUser?._id));
    }
  }, [dispatch, id]);
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={currUser?.coverPic ? currUser.coverPic : Cover} alt="" />

        <img
          src={currUser?.profilePic ? currUser.profilePic : Profile}
          alt=""
        />
      </div>

      <div className="ProfileName">
        <span>{id ? currUser.name : userInfo.oldUser?.name}</span>
        <span>
          {currUser?.worksAt ? currUser.worksAt : "Nothing to see..."}
        </span>
      </div>

      <div className="followStatus">
        <div>
          <div className="follow">
            <span>{currUser.following?.length}</span>
            <span>Followings</span>
          </div>
          <div className="follow">
            <span>{currUser.followers?.length}</span>
            <span>Followers</span>
          </div>

          {location === "ProfilePage" && (
            <>
              <div className="follow">
                <span>{result}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
      </div>
      <span
        style={{ display: location !== "HomePage" ? "none" : "" }}
        onClick={handleClick}
      >
        My Profile
      </span>
    </div>
  );
}

export default ProfileCard;
