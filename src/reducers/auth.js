import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    AUTHENTICATE_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATE_FAIL,
    POST_FAIL,
    POST_SUCCESS
} from '../actions/types'

const initState = {
    isAuthenticated: null
}

export default function(state = initState, action) {
    const {type, payload} = action;

    switch(type) {
        case AUTHENTICATE_SUCCESS:
        case AUTHENTICATE_FAIL:
            return {
                ...state,
                isAuthenticated: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case POST_SUCCESS:
        case POST_FAIL:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
            return state
        default:
            return state
    }
}