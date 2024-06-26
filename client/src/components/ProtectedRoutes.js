import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate=useNavigate();

  //get user
  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        navigate("/login");
         //<Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user,getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}



// import React from 'react'
// import { Navigate } from 'react-router-dom'
// import {useSelector,useDispatch} from 'react-redux'
// import axios from 'axios'
// import { setUser } from '../redux/features/userSlice';
// import { hideLoading, showLoading } from '../redux/features/alertSlice';

// export default function ProtectedRoutes({children}) {
//   const dispatch= useDispatch();
//   const {user} = useSelector((state) => state.user);
//     //get user
//   const getUser=async()=>{
//     try {
//       dispatch(showLoading());
//       const res= await axios.post('/api/v1/user/getUserdata',
//       { token: localStorage.getItem('token')},
//       {
//         headers:{
//           Authorization: `Bearer ${localStorage.getItem('token')}` ,
//         },
//       }
//       );
//       dispatch(hideLoading());
//       if(res.data.success){
//         dispatch(setUser(res.data.data));
//       }else{
//         <Navigate to='/login'/>
//       }
      
      
//     } catch (error) {    
//       dispatch(hideLoading());
//       console.log(error);
//     }
//   };


//   if(localStorage.getItem("token")){
//       return children;
//     }else{
//       return <Navigate to="/login" />;
//     }
// }


// import React, { useEffect } from 'react'
// import { Navigate } from 'react-router-dom'
// import axios from 'axios'
// import {useSelector,useDispatch} from 'react-redux'
// import { hideLoading, showLoading } from '../redux/features/alertSlice';
// import { setUser } from '../redux/features/userSlice';

// export default function ProtectedRoutes({children}) {
//   const dispatch= useDispatch();
//   const {user} = useSelector((state) => state.user);

//   //get user
//   const getUser=async()=>{
//     try {
//       dispatch(showLoading());
//       const res= await axios.post('/api/v1/user/getUserdata',
//       { token: localStorage.getItem('token')},
//       {
//         headers:{
//           Authorization: `Bearer ${localStorage.getItem('token')}` ,
//         },
//       }
//       );
//       dispatch(hideLoading());
//       if(res.data.success){
//         dispatch(setUser(res.data.data));
//       }else{
//         (<Navigate to="/login" />);
//       }
//     } catch (error) {    
//       dispatch(hideLoading());
//       console.log(error);
//     }
//   };

//   useEffect(()=>{
//     if(!user){
//       getUser();
//     }

//   },[user,getUser]);
//   if(localStorage.getItem("token")){
//     return children;
//   }else{
//     return <Navigate to="/login" />;
//   }
// }

