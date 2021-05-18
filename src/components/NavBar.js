
import {NavLink, Link} from 'react-router-dom';
import Notification from './Notification.js';
import NotificationBox from './NotificationBox.js';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { set } from 'js-cookie';

function NavBar({login, logout, follow, isAuthenticated }) {
    
    const authNav = (
        <div className="navbar_wrapper">
            <Link exact to="/">Home</Link>
            <NavLink exact to="/follow">Follow</NavLink>
            <NavLink exact to="/logout" onClick={logout}>Log Out</NavLink>
            <Notification>
                <NotificationBox/>
            </Notification>
        </div>
    );
    
    const anonNav = (
        <div className="navbar_wrapper">
            <Link exact to="/">Home</Link>
            <NavLink exact to="/login">Log In</NavLink>
            <NavLink exact to="/register">Register</NavLink>
            <Notification>
                <NotificationBox/>
            </Notification>
        </div>
    );
    

    return (
        <div className="navbar_container">
            {(isAuthenticated) ? authNav : anonNav}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(NavBar);