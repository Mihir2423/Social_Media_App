import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const signIn = (formData) => API.post('/auth/signin', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);

export const createpost = (newPost) => API.post('/post', newPost);
export const timeLinePost = (id) => API.get(`/post/${id}/timeLine`)
export const likePost=(id, userId)=>API.put(`post/${id}/like`, {userId: userId})

export const allUsers = ()  => axios.get(`https://social-d16k.onrender.com/user`)
export const getUser = (userId) => API.get(`/user/${userId}`);
export const followUser = (id,userId) => API.put(`/user/${id}/follow`, {currentUserId : userId})
export const unfollowUser = (id,userId) => API.put(`/user/${id}/unfollow`, {currentUserId : userId})

export const userChats = (userId) => API.get(`/chat/${userId}`)
export const getMessages = (chatId) => API.get(`/message/${chatId}`)
export const addMessages = (data) => API.post(`/message`, data)