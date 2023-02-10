import React, { useState, useRef } from "react";
import ProfileImage from "../../assets/images/defaultProfile.png";
import FileBase from "react-file-base64";
import "./PostShare.css";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/actions/posts";

function PostShare() {
  // navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

  // function positionSuccess({ coords }) {
  //   const getoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`;
  //   fetch(getoApiUrl)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }
  // function positionError() {
  //   alert(
  //     "There was an error getting your location. Please allow us to use your location and refresh the page."
  //   );
  // }
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const [imageSelected, setImageSelected] = useState(null);
  const [postMessage, setPostMessage] = useState({
    desc: "",
    image: "",
    userId: userInfo.oldUser._id,
    userProfilePic: userInfo.oldUser.profilePic,
  });
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createPost({ ...postMessage, name: userInfo.oldUser.name }));
    setImageSelected(null);
  }
  const handleEncoding = (imageData) => {
    setImageSelected(imageData);
    setPostMessage({ ...postMessage, image: imageData.base64 });
  };
  function handleClick() {
    const photo = document.querySelector(`input[type="file" i]`);
    photo.click();
  }

  return (
    <div className="PostShare">
      <img
        src={
          userInfo?.oldUser?.profilePic
            ? userInfo?.oldUser?.profilePic
            : ProfileImage
        }
        alt=""
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's happening"
          onChange={(e) =>
            setPostMessage({ ...postMessage, desc: e.target.value })
          }
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "#B5D5C5" }}
            onClick={handleClick}
          >
            <UilScenery />
            Photo
            <FileBase
              id="photo"
              type="file"
              multiple={false}
              onDone={handleEncoding}
            />
          </div>
          <div className="option" style={{ color: "#ECA869" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "#EAC7C7" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "#F5F5DC" }}>
            <UilSchedule />
            Shedule
          </div>
          <button className="button ps-button" type="submit">
            Share
          </button>
        </div>
        {imageSelected && (
          <div className="previewImage">
            <UilTimes onClick={() => setImageSelected(null)} />
            <img src={imageSelected.base64} alt="" />
          </div>
        )}
      </form>
    </div>
  );
}

export default PostShare;
