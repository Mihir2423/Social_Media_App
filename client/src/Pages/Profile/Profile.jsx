import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PostSide, ProfileCard, ProfileLeft, RightSide } from '../../components'
import "./Profile.css"

function Profile() {
  const navigate = useNavigate()

  React.useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("profile"))
    if(!userInfo) navigate("/auth")
  }, [navigate])
  return (
    <div className="Profile">
        <ProfileLeft/>

        <div className="Profile-center">
            <ProfileCard location = "ProfilePage"/>
            <PostSide/>
        </div>

        <RightSide/>
    </div>
  )
}

export default Profile
