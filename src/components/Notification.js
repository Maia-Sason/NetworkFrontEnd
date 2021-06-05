import React, { useEffect, useRef, useState } from 'react'
import NotificationBox from './NotificationBox.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { read } from '../actions/notification'

function Notification({children, user, read}) {
    const [open, setNotificationBox] = useState(false);
    const [loaded, setLoaded] = useState(false)
    const nodeRef = useRef(null)

    const unread = user.unread

    const notificationsToSend = JSON.parse(JSON.stringify(user.notifications))

    const notificationBoxFunction = () => {
        setLoaded(true)
        if (open == true && unread > 0) {
            read()
        }
        setNotificationBox(!open)
    }
    return (
        <div onClick={notificationBoxFunction}>
            <div className="bell">
                {unread > 0 && <div className="bell_unread"></div>}
                <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
            </div>
            <CSSTransition
                in={open}
                nodeRef={nodeRef}
                classNames="menu-primary"
                timeout={1000}
                unmountOnExit
            >
                <div ref={nodeRef}>
                    <NotificationBox loaded={loaded} notifications={notificationsToSend}/>
                </div>
            </CSSTransition>
        </div>
    )
}

const mapStateToProps = state => ({
    notifications: state.user.notifications,
    user: state.user
})

export default connect(mapStateToProps, {read})(Notification)