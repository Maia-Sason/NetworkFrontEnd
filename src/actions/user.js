import Cookies from 'js-cookie';
import axios from 'axios';
import {
    USER_SUCCESS,
    USER_FAIL
} from './types'

export const get_user = (content) => async dispatch => {
    const config = {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/network/user`, config)

        if (res.data.error) {
            console.error(res.data.error)
            dispatch({
                type: USER_FAIL
            });
        } else {
            dispatch({
                type: USER_SUCCESS,
                payload: res.data
            })
        }
    } catch(err) {
        dispatch({
            type: USER_FAIL
        })
    }
}