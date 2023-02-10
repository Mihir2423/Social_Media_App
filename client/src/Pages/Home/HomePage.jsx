import React from 'react'
import { RightSide, ProfileSide, PostSide } from '../../components'
import decode from 'jwt-decode';
import "./HomePage.css"
import { useNavigate } from 'react-router-dom';
import {LOGOUT} from "../../redux/types"
import { useDispatch } from 'react-redux';


function HomePage() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("profile"))
  const dispatch = useDispatch()
  const logout = () => {
    dispatch({ type: LOGOUT });

    navigate('/auth');
  };
  React.useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className='home-page'>
      <ProfileSide/>
      <PostSide/>
      <RightSide/>
    </div>
  )
}

export default HomePage
