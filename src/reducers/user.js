import {
    USER_SUCCESS,
    USER_FAIL,
    LIKE_SUCCESS,
    UNLIKE_SUCCESS,
    LIKE_FAIL,
    POST_SUCCESS,
    POST_FAIL,
    FOLLOW_SUCCESS,
    UNFOLLOW_SUCCESS,
    FOLLOW_FAIL
} from '../actions/types'

const initState = {
    isAuthenticated: null,
    username: '',
    email: '',
    likes: '',
    post: '',
    follows: ''
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
                likes: payload.likes,
                follows: payload.follows

            }
        case USER_FAIL: 
            return {
                ...state,
                id: '',
                username: '',
                email: '',
                likes: '',
                follows: ''
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
        case FOLLOW_SUCCESS:
            return {
                ...state,
                follows: state.follows.concat(payload)
            }
        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                follows: state.follows.filter((item) => item !== payload)
            }
        case FOLLOW_FAIL:
        case POST_FAIL:
        case LIKE_FAIL:
            return state
        default:
            return state
    }
}