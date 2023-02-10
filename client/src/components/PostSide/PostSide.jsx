import React from 'react'
import {Posts, PostShare} from "../"
import "./PostSide.css"
function PostSide() {

  return (
    <div className="PostSide">
      <PostShare/>
      <Posts/>
    </div>
  )
}

export default PostSide
