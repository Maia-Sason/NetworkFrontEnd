
import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from 'axios';

function NotificationBox({open,loaded, notifications}) {
    // const [notifications, setNotifications] = useState([])
    // const [loaded, setLoaded] = useState(false)

    // const fetchData = async () => {
    //     let res
    //     try {
    //         res = await axios.get(`${process.env.REACT_APP_API_URL}/network/notifications`)
    //     } catch(err) {}

    //     return res;
    // };

    // const getNotifications = async () => {        
    //     const tasksFromServer = await fetchData()
    //     setNotifications(tasksFromServer.data);

    // }

    // useEffect(() => {
    //     getNotifications();

    // }, []);

    // useEffect(() => {
    //     console.log(notifications);
    //     setLoaded(true);
    // }, [notifications]);

    const NotificationsToDisplay = (
        (loaded && notifications != null) && notifications.map((notification) => {
            return (
                <>
                <div className={`${notification.read == false && 'notification_item_unread'} notification_item`} key={notification.id}>
                    {notification.read == false && <div className="unread_pointer"/>}
                    <p>{notification.content}</p>
                </div>
                </>
            )
        })
    )

    return (
        
        <div className="notify_box">
            {(notifications != null && notifications.length > 0) ? NotificationsToDisplay : <div className='notification_item'><p>You don't have any notifications</p></div> }
        </div>

    )
}

export default NotificationBox