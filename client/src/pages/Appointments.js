import React, { useState ,useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'
const Appointments = () => {
  const [appointments,Setappoinments]=useState([])
  const  getAppointments =async()=>{
    try {
        const res= await axios.get('/api/v1/user/user-appointments',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
                
            }
        })
        if(res.data.success){
            Setappoinments(res.data.data)
        }

    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    getAppointments();
  },[])
  const columns=[
    {
        title:'ID',
        dataIndex:'_id'
    },
    {
        title:'Name',
        dataIndex:'name',
        render:(text,record)=>(
            <span>
                 {record.doctorInfo.firstName}{record.doctorInfo.lastName}
            </span>
           
        )
    },
    // {
    //     title:'Phone',
    //     dataIndex:'phone',
    //     render:(text,record)=>(
    //         <span>
    //              {record.doctorId.phone}
    //         </span>
           
    //     )
    // },
    {
        title:'Date & Time ',
        dataIndex:'date',
        render:(text,record)=>(
            <span>
                 {moment(record.date).format('DD-MM-YYYY')} &nbsp;
                 {moment(record.time).format('HH:mm')}
            </span>
           
        )
    },
    {
        title:'Status',
        dataIndex:'status'
        
    },
    
    ]
  return (
    <Layout>
      <h4 className='m-5 pb-3 border-bottom text-center'>Appointments list</h4>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default Appointments
