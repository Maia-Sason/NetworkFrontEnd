import React, {useEffect, useState} from 'react';
import Navbar from "../components/NavBar";
import {connect} from 'react-redux';
import { checkAuthenticated} from '../actions/auth';
import NotificationBox from '../components/NotificationBox';
import { get_user } from '../actions/user'

const Layout = ({ children, get_user, checkAuthenticated }) => {
    useEffect(() => {
        checkAuthenticated();
        get_user();
    }, []);
    
    return (
        <>
            <Navbar/>
            <header className="App-header">
            {children}
            </header>
        </>
    )
}

export default connect(null, {checkAuthenticated, get_user})(Layout)