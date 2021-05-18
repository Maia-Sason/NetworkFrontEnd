import React, { useState } from 'react';
import CSRFToken from '../components/CSRFToken';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const {username, password} = loginForm

    const onChange = e => setLoginForm({...loginForm, [e.target.name]: e.target.value })

    const onSubmit = e => {
        console.log(Login)
        e.preventDefault()

        login(username, password)
    }

    if (isAuthenticated) {
        return <Redirect to="/"/>
    }

    return (
    <>
    <h1>Log Into your Account.</h1>
    <div className="form_container">
        
        <form className="form_wrapper" onSubmit={e => onSubmit(e)}>
            <CSRFToken />
            <div className="input_field">
                <label>Username</label>
                <input type="text" onChange={e => onChange(e)} name="username" className="registration_input" value={username} placeholder="Enter Username" required></input>
            </div>
            <div className="input_field">
                <label>Password</label>
                <input type="password" onChange={e => onChange(e)} name="password" className="registration_input" value={password} placeholder="Enter Password" required></input>
            </div>
            <input type="submit" className="submit_button" value="Log in"></input>
        </form>
    </div>
    </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);