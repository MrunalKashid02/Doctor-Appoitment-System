import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const BookingPage = () => {
    const params =useParams()
    const [doctors,setDoctors]=useState([]);
    const [date,setdate]=useState()
    const [timings,setTimings]=useState()
    const [isAvailable,setisAvailable]=useState();

    //login user data
    const getUserData = async () =>{
      try {
        const res= await axios.post('/api/v1/doctor/getDoctorById',
        {doctorId:params.doctorId},
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
        <h3>Booking Page</h3>
        <div className='container'>
            {doctors && (
                <div>
                    <h4>Dr.{doctors.firstName} {doctors.lastName}</h4>
                    <h4>Fees: {doctors.feesperCunsaltation}</h4>
                    <h4>Timings: {doctors.timings[0]-[1]}</h4>
                    <div className='d-flex flex-column'>
                        <DatePicker format={"DD-MM-YYYY"} onChange={(value)=> setdate(moment(value).format('DD-MM-YYYY'))}/>
                        <TimePicker.RangePicker format={"HH:mm"} onChange={(values)=>setTimings([moment(values[0]).format('HH:mm'),moment(values[1]).format('HH:mm')])}/>
                        <button className='btn btn-primary mt-2'>Check Availability</button>
                    </div>   
                </div>
            )}
        </div>
        </Layout>
    )
}

export default BookingPage
