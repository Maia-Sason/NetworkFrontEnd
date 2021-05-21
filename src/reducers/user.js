import {
    USER_SUCCESS,
    USER_FAIL,
    LIKE_SUCCESS,
    UNLIKE_SUCCESS,
    LIKE_FAIL,
    POST_SUCCESS,
    POST_FAIL
} from '../actions/types'

const initState = {
    isAuthenticated: null,
    username: '',
    email: '',
    likes: '',
    post: ''
}

export default function(state = initState, action) {
    const {type, payload} = action;

    switch(type) {
        case USER_SUCCESS:
            return {
                ...state,
                id: payload.id,
                username: payload.username,
                email: payload.email,
                likes: payload.likes


            }
        case USER_FAIL: 
            return {
                ...state,
                id: '',
                username: '',
                email: '',
                likes: ''
            }
        case LIKE_SUCCESS:
            return {
                ...state,
                likes: state.likes.concat(payload)
            }
        case UNLIKE_SUCCESS:
            return {
                ...state,
                likes: state.likes.filter((item) => item !== payload)
            }
        case POST_SUCCESS:
            return {
                ...state,
                post: payload
            }
        case POST_FAIL:
        case LIKE_FAIL:
            return state
        default:
            return state
    }
}