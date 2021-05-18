import {
    USER_SUCCESS,
    USER_FAIL
} from '../actions/types'

const initState = {
    isAuthenticated: null,
    username: '',
    email: ''
}

export default function(state = initState, action) {
    const {type, payload} = action;

    switch(type) {
        case USER_SUCCESS:
            return {
                ...state,
                id: payload.id,
                username: payload.username,
                email: payload.email

            }
        case USER_FAIL: 
            return {
                ...state,
                id: '',
                username: '',
                email: ''
            }
        default:
            return state
    }
}