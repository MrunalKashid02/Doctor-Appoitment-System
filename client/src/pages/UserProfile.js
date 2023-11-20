import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const {user} = useSelector(state => state.user)
    // const getUsers=async()=>{
    //     try {
    //         const res= await axios.get('/api/v1/user/getAllUsers',{
    //             headers:{
    //                 Authorization:`Bearer ${localStorage.getItem("token")}`,
    //             }
    //         })
    //         if(res.data.success){
    //             setusers(res.data.data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //    } ;
    //    useEffect(()=>{
    //     getUsers()
    //    },[]);
  return (
    <Layout>
      <div className='card p-2' >
            <div className='card-body mt-2'>
                <p>
                    <b>Name: </b> {user&&user.name}
                </p>
                <p>
                    <b>Email ID:</b> {user&&user.email}
                </p>
            </div>
        </div>
    
    </Layout>
  )
}

export default UserProfile
