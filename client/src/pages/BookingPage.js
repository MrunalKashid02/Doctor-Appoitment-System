import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import { DatePicker, TimePicker, message } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import moment from 'moment';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

const BookingPage = () => {
    const {user} = useSelector(state=> state.user)
    const params =useParams()
    const [doctors,setDoctors]=useState([]);
    const [date,setdate]=useState("")
    const [time,setTime]=useState()
    const [isAvailable,setisAvailable]=useState(false);
    const dispatch=useDispatch()

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
    /// booking function
    const handleBooking = async()=>{
      try {
        setisAvailable(true);
        if(!date && !time){
          return alert("Date & Time Required");
        }
        dispatch(showLoading())
        const res=await axios.post('/api/v1/user/book-appointment',
        {
          doctorId:params.doctorId,
          userId:user._id,
          doctorInfo:doctors,
          userInfo:user,
          date:date,
          time:time
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        }
        ) 
        dispatch(hideLoading())
        if(res.data.success){
          message.success(res.data.message)
        }
      } catch (error) {
        dispatch(hideLoading())
        console.log(error)
      }
    }
    const handleAvailability = async()=>{
      try {
        dispatch(showLoading())
        const res= await axios.post('/api/v1/user/booking-availability',
        {
          doctorId:params.doctorId,date,time
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')} `
          }
        }
        )
        dispatch(hideLoading());
        if(res.data.success){
          setisAvailable(true);
          console.log(isAvailable)
          message.success(res.data.message)
        }else{
          message.error(res.data.message)
        }
        
      } catch (error) {
        dispatch(hideLoading())
        console.log(error)
      }
    }
    useEffect(()=>{
      getUserData()
    },[])
    return (
        <Layout>
        <h4 className='m-3 pb-3 border-bottom text-center'>Booking Page</h4>
        <div className='container'>
            {doctors && (
                <div className='row align-center'>
                  
                    <h4>Dr.{doctors.firstName} {doctors.lastName}</h4>
                    <h4>Fees: {doctors.feesperCunsaltation}</h4>
                    {/* {<h4>Timings: {doctors.timings}</h4>} */}
                    <div className='d-flex flex-column w-50'>
                        <DatePicker className='m-2' format={"DD-MM-YYYY"} onChange={(value)=>{setdate(moment(value).format('DD-MM-YYYY'))}}/>
                        <TimePicker className='m-2' format={"HH:mm"} onChange={(value)=> {setTime(moment(value).format('HH:mm'))}}/>
                        <button className='btn btn-primary mt-2' onClick={handleAvailability}>Check Availability</button>
                        <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button>

                    </div>   
                  
                </div>
            )}
        </div>
        </Layout>
    )
}

export default BookingPage
