import React from 'react'
import "../styles/Registerstyles.css";
import { Form, Input,message,Button } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  
  // form handler
  const navigate = useNavigate()
  const dispatch= useDispatch()

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res= await axios.post('/api/v1/user/register',values) ;   
      dispatch(hideLoading());
        if(res.data.success){
          message.success('Register Successfully');
          navigate('/login');
        }
        else{
          message.error(res.data.message);
        }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }  
  };
  return (
    <>
      {/* <div className='form-container'>
        <Form layout="vertical" onFinish={onfinishHandler} className="register-form">
          <h3 className='text-center'>Register</h3>
            <Form.Item label="Name" name="name">
              <Input type="text" required/>
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" required/>
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required/>
            </Form.Item>
            
            <Link to="/login" className='m-2'>Already user login here</Link>
            <button className="btn btn-primary" type='submit'>Register</button>
            
        </Form>

      </div> */}
      <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Nice To Meet U</h1>
        <Form layout="vertical" onFinish={onfinishHandler}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" required/>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email"  required/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" required />
          </Form.Item>

          <button
            className="btn btn-primary btn-lg button"
            type="submit"
          >
            REGISTER
          </button>

          <Link to="/login" className="mt-5">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
    </>
  );
};

export default Register
