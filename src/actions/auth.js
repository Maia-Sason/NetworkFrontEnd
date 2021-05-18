import Cookies from 'js-cookie';
import axios from 'axios';
import { get_user } from './user'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    AUTHENTICATE_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATE_FAIL
} from './types'



// it matters what order these variables are.
export const register = (username, password, email, confirmation) => async dispatch => {
    const config = {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password, confirmation, email });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/network/register`, body, config)

        if (res.data.error) {
            console.error(res.data.error)
            dispatch({
                type: REGISTER_FAIL
            });
        } else {
            dispatch({
                type: REGISTER_SUCCESS
            })
        }
    } catch(err) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// redux thunk lets us do dispatch
export const login = (username, password) => async dispatch => {
    const config = {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    const body = JSON.stringify({ username, password })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/network/login`, body, config)

        if (res.data.error) {
            console.log(res.data.error)
            dispatch({
                type: LOGIN_FAIL
            })
            // load user
        } else {
            dispatch({
                type: LOGIN_SUCCESS
            })
            dispatch(get_user())
        }

    } catch(err) {
        dispatch({
            type: LOGIN_FAIL
        })

    }

}

// redux thunk lets us do dispatch
export const checkAuthenticated = () => async dispatch => {
    const config = {
        credentials: 'include',
        mode: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/network/authenticated`, config)

        if (res.data.error || res.data.isAuthenticated === 'error') {
            dispatch({
                type: AUTHENTICATE_FAIL,
                payload: false
            })
        } else if (res.data.isAuthenticated === "success") {
            dispatch({
                type: AUTHENTICATE_SUCCESS,
                payload: true
            })
        }

    } catch(err) {
        dispatch({
            type: AUTHENTICATE_FAIL,
            payload: false
        })

    }

}

export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': Cookies.get('csrftoken')
        }
    }

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/network/logout`, body, config)

        if (res.data.error) {
            console.log(res.data.error)
            dispatch({
                type: LOGOUT_FAIL
            })
        } else {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }

    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL
        })

    }

}

export const create = (content) => async dispatch => {
    const config = {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ content });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/network/create`, body, config)
    } catch(err) {

    }
}