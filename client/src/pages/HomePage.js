import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Row } from 'antd';
import Doctorlist from '../components/Doctorlist';

const HomePage = () => {
  const [doctors,setDoctors]=useState([]);

  //login user data
  const getUserData = async () =>{
    try {
      const res= await axios.get('/api/v1/user/getAllDoctors',
      {
        headers:{
          Authorization: "Bearer "+ localStorage.getItem('token'),
        }
      });
      if(res.data.success){
        setDoctors(res.data.data);
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getUserData()
  },[])
  return (
    <Layout>
      <h4 className='m-5 p-3 text-center border-bottom '>Welcome Here !</h4>
      <Row>
        {doctors && doctors.map((doctor) => <Doctorlist doctor={doctor}/> )}
      </Row>
    </Layout>
  )
}

export default HomePage
