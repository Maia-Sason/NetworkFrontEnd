import React, { useState } from 'react'
import NotificationBox from './NotificationBox.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group';

function Notification({children}) {
    const [open, setNotificationBox] = useState(false);
    const nodeRef = React.useRef(null)

    return (
        <div onClick={() => setNotificationBox(!open)}>
            <div className="bell">
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
                    <NotificationBox/>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Notification