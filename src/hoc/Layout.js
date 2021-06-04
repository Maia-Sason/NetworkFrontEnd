import React, {useEffect, useState} from 'react';
import Navbar from "../components/NavBar";
import {connect} from 'react-redux';
import { checkAuthenticated} from '../actions/auth';
import NotificationBox from '../components/NotificationBox';
import Load from '../components/Load.js';
import ProfileHeader from '../components/ProfileHeader.js';
import { get_user } from '../actions/user';


const Layout = ({ children, get_user, checkAuthenticated }) => {
    const [loadedUser, setLoadedUser] = useState(false)
    
    useEffect(() => {
        checkAuthenticated();
        get_user();
        setLoadedUser(true)
    }, []);
    
    return (
        <>
            {loadedUser ? <Navbar/> : <Load/>}
            <header className="App-header">
            {loadedUser ? children : <Load/>}
            </header>
        </>
    )
}

export default connect(null, {checkAuthenticated, get_user})(Layout)