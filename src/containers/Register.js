import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken';

const Register = ({ register, isAuthenticated }) => {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmation: ''
    })
    const [accountCreated, setAccountCreated] = useState(false)

    // Set default as empty
    const {username, email, password, confirmation} = registerForm

    const onChange = e => setRegisterForm({...registerForm, [e.target.name]: e.target.value })

    // maybe add something to live check if username/email already exists.

    const onSubmit = e => {
        console.log(registerForm)
        e.preventDefault()

        if (password === confirmation) {
            register(username, password, email, confirmation);
            setAccountCreated(true);
        }
    }

    if (accountCreated) {
        return <Redirect to="/login"/>
    } else if (isAuthenticated) {
        return <Redirect to="/"/>
    }

    
    return ( 
    <>
    <h1>Register for an Account.</h1>
    <div className="form_container">
        
        <form className="form_wrapper" onSubmit={e => onSubmit(e)}>
            <CSRFToken />
            <div className="input_field">
                <label>Username</label>
                <input type="text" onChange={e => onChange(e)} name="username" className="registration_input" value={username} placeholder="Enter Username" required></input>
            </div>
            <div className="input_field">
                <label>Email</label>
                <input type="email" onChange={e => onChange(e)} name="email" className="registration_input" value={email} placeholder="Enter email address" required></input>
            </div>
            <div className="input_field">
                <label>Password:</label>
                <input type="password" onChange={e => onChange(e)} name="password" className="registration_input" value={password} required></input>
            </div>
            <div className="input_field">
                <label>Re-enter password:</label>
                <input type="password" onChange={e => onChange(e)} name="confirmation" className="registration_input" value={confirmation} required></input>
            </div>
            <input type="submit" className="submit_button" value="register"></input>
        </form>
    </div>
    </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {register} )(Register)