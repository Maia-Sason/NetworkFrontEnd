import Cookies from 'js-cookie';
import axios from 'axios';
import {
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,
    UNFOLLOW_SUCCESS
} from './types'

export const follow = (id) => async dispatch => {
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
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/network/follow/${id}`, body, config)

        if (res.data.follow === "follow") {
            console.error(res.data.isLiked)
            dispatch({
                type: FOLLOW_SUCCESS,
                payload: id
            });
        } else if (res.data.follow === "unfollow") {
            dispatch({
                type: UNFOLLOW_SUCCESS,
                payload: id
            })
        } else {
            dispatch({
                type: FOLLOW_FAIL
            })
        }
    } catch(err) {
        dispatch({
            type: FOLLOW_FAIL
        })
    }

}