import React from "react";
import Comment from "../../../assets/img/comment.png";
import Share from "../../../assets/img/share.png";
import Heart from "../../../assets/img/like.png";
import NotLike from "../../../assets/img/notlike.png";
import Img from "../../../assets/images/defaultProfile.png";
import Avatar from "@mui/material/Avatar";
import "./Post.css";
import { likePost } from "../../../api/api";

function Post({ data }) {
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const [liked, setLiked] = React.useState(
    data.likes.includes(userInfo.oldUser._id)
  );
  const [likes, setLikes] = React.useState(data.likes.length);
  function handleLike() {
    likePost(data._id, userInfo.oldUser._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  }
  return (
    <div className="Post fade-in-fwd">
      <div className="detail">
        <Avatar
          alt="Remy Sharp"
          src={data?.userProfilePic ? data?.userProfilePic : Img}
        />
        <span>
          <b>{data?.name}</b>
        </span>
      </div>
      <span className="post-description"> {data?.desc}</span>
      <img src={data?.image} alt="" />
      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" onClick={handleLike} />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "grey", fontSize: "12px" }}>{likes} likes</span>
    </div>
  );
}

export default Post;
