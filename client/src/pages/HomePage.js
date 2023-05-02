import React,{useEffect} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'

const HomePage = () => {

  //login user data
  const getUserdata = async () =>{
    try {
      const res= await axios.post('/api/v1/user/getUserdata',
      {},
      {
        headers:{
          Authorization: "Bearer "+ localStorage.getItem('token'),
        }
      })

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getUserdata()
  },[])
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  )
}

export default HomePage
