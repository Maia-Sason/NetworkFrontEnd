import Cookies from 'js-cookie';
import axios from 'axios';
import {
    POST_SUCCESS,
    POST_FAIL,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    LIKE_SUCCESS,
    UNLIKE_SUCCESS,
    LIKE_FAIL
} from './types'

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

        if (res.data.error) {
            console.error(res.data.error)
            dispatch({
                type: POST_FAIL
            });
        } else {
            dispatch({
                type: POST_SUCCESS
            })
        }
    } catch(err) {
        dispatch({
            type: POST_FAIL
        })
    }
}

export const update = (content, postID) => async dispatch => {
    const config = {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ content });
    const id = postID;

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/network/create/${id}`, body, config)
        
        if (res.data.error) {
            console.error(res.data.error)
            dispatch({
                type: UPDATE_FAIL
            });
        } else {
            dispatch({
                type: UPDATE_SUCCESS
            })
        }
    } catch(err) {
        dispatch({
            type: UPDATE_FAIL
        });
    }

}

export const like = (id) => async dispatch => {
    const config = {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/network/like/${id}`, body, config)

        if (res.data.isLiked === "liked") {
            console.error(res.data.isLiked)
            dispatch({
                type: LIKE_SUCCESS,
                payload: id
            });
        } else if (res.data.isLiked === "unliked") {
            dispatch({
                type: UNLIKE_SUCCESS,
                payload: id
            })
        } else {
            dispatch({
                type: LIKE_FAIL
            })
        }
    } catch(err) {
        dispatch({
            type: LIKE_FAIL
        })
    }

}