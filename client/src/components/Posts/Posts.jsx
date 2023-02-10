import "./Posts.css";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTimeLinePost } from "../../redux/actions/posts";
import React from "react";

function Posts() {
  const dispatch = useDispatch();

  const resData = useSelector((state) => state.post);
  const user = useSelector((state)=> state.auth.authData)
  const { id } = useParams();
  let filteredData = resData;
  if (id) {
    filteredData = resData.filter((post) => post.userId === id);
  }
  React.useEffect(() => {
    if (id !== undefined) {
      dispatch(getTimeLinePost(id));
    } else {
      dispatch(getTimeLinePost(user.oldUser._id))
    }
  }, [dispatch, id]);
  return (
    <>
      {!filteredData?.length ? (
        <CircularProgress />
      ) : (
        <div className="Posts">
          {filteredData?.map((post, id) => {
            return <Post key={post._id} data={post} id={id} />;
          })}
        </div>
      )}
    </>
  );
}

export default Posts;
