import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { Col,Form,Input,Row,TimePicker, message } from 'antd';
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { showLoading,hideLoading } from '../../redux/features/alertSlice';
import moment from 'moment'


const Profile = () => {
  const {user}= useSelector((state) => state.user)
  const [doctor,setDoctor]=useState(null)
  const params= useParams()
  const dispatch=useDispatch();
    const navigate=useNavigate();
  //update doc
  const handleFinish=async (values)=>{
    try {
        dispatch(showLoading());
        const res=await axios.post('/api/v1/doctor/updateProfile',{...values,userId:user._id,
            timings:[
                moment(values.timings[0]).format('HH:mm'),
                moment(values.timings[1]).format('HH:mm'),
            ],},
            {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideLoading());
        if(res.data.success){
            message.success(res.data.message);
            navigate('/');
        }else{
            message.error(res.data.success);
        }

    } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something went wrong')
    }
}
  //getDoctor
  const getDoctorInfo = async ()=>{
    try {
      const res= await axios.post('/api/v1/doctor/getDoctorInfo',
      {userId:params.id},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }  
      })
      if(res.data.success){
        setDoctor(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getDoctorInfo()
  },[])
  return (
    <Layout>
      <h4 className='m-3 pb-3 border-bottom text-center' style={{borderBottomStyle:'2px solid gray ;'}}>Doctor Profile</h4> 
      {doctor && (
        <Form layout="vertical" onFinish={handleFinish} className='m-3' 
        initialValues={{
            ...doctor,
                timings:[
                    moment(doctor.timings[0],'HH:mm'),
                    moment(doctor.timings[1],'HH:mm'),
                ]
            }
        }>
        <h4 >Personal Details :</h4>
          <Row gutter={20}>
              
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>
                      <Input type="text" placeholder="your name"/>
                  </Form.Item>
  
              </Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>
                      <Input type="text" placeholder="your last name"/>
                  </Form.Item>
  
              </Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="phone" name="phone" required rules={[{required:true}]}>
                      <Input type="text" placeholder="your phone "/>
                  </Form.Item>
  
              </Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                      <Input type="text" placeholder="your email"/>
                  </Form.Item>
  
              </Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Website" name="website">
                      <Input type="text" placeholder="your website"/>
                  </Form.Item>
  
              </Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Address" name="address" required rules={[{required:true}]}>
                      <Input type="text" placeholder="your address"/>
                  </Form.Item>
  
              </Col>
          </Row>
          <h4 className=''>Personal Details :</h4>
          <Row gutter={20}>
              
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                      <Input type="text" placeholder="your specialization"/>
                  </Form.Item>
  
              </Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                      <Input type="text" placeholder="your experience"/>
                  </Form.Item>
  
              </Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Fees per Consultaion" name="feesperCunsaltation" required rules={[{required:true}]}>
                      <Input type="text" placeholder="Fees per consulation "/>
                  </Form.Item>
  
              </Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Timings" name="timings" required rules={[{required:true}]}>
                      <TimePicker.RangePicker format="HH:mm"/>
                  </Form.Item>
  
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
              <button className='btn btn-primary form-btn' type='submit'>
                  Update
              </button>
              </Col>
  
          </Row>
        </Form>
      )}
    </Layout>
  )
}

export default Profile
