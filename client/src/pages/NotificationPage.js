import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const NotificationPage = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}= useSelector((state) => state.user);
    //handle read noti
    const handleMarkAllRead = async()=>{
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error(res.data.message);
            }

        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };
    //delete notification 
    const handleDeleteAllRead =async ()=>{
        try {
            dispatch(showLoading());
            const res=await axios.post('/api/v1/user/delete-all-notification' ,{userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.success(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };
  return (
    <Layout>
        <h4 className='m-3 p-3 text-center'>Notification Page</h4>
        <Tabs className='m-1'>
            <Tabs.TabPane className='m-1 pt-1' tab="Unseen" style={{cursor:'pointer'}} key={0}>
                <div className='d-flex justify-content-end'>
                    <h5 className='p-2' onClick={handleMarkAllRead}>
                        Mark All Read
                    </h5>
                </div>
                {user && user.notification.map((notificationMsg)=>(
                    <div className='card'  style={{cursor:'pointer'}}>
                            <div className='card-text' onClick={()=> navigate(notificationMsg.onClickPath)}>
                                {notificationMsg.message}
                            </div>
                        </div> 
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane className='m-1 pt-1' tab="Seen" key={1}>
                <div className='d-flex justify-content-end'>
                    <h5 className='p-2 text-primary' style={{cursor:"pointer"}} onClick={handleDeleteAllRead}>
                        Delete All Read
                    </h5>
                </div>
                {user && user.seenNotification.map((notificationMsg)=>(
                    <div className='card'  style={{cursor:'pointer'}}>
                            <div className='card-text' onClick={()=> navigate(notificationMsg.onClickPath)}>
                                {notificationMsg.message}
                            </div>
                        </div> 
                    ))
                }
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage;
