import Cookies from 'js-cookie';
import axios from 'axios';
import {
    NOTIFICATION_REC_SUCCESS,
    NOTIFICATION_REC_FAIL,
    NOTIFICATION_READ_SUCCESS,
    NOTIFICATION_READ_FAIL
} from "./types"

export const receive = (data) => async dispatch => {
    // Receives a new notification from websocket server,
    // relays notification into redux state.
    try {
        dispatch({
            type: NOTIFICATION_REC_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
            type: NOTIFICATION_REC_FAIL
        })
    }

}

export const read = () => async dispatch => {
    const config = {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/network/notifications_read`, config)

        if(res.data == "error") {
            dispatch({
                type: NOTIFICATION_READ_FAIL
            })
        } else {
            dispatch({
                type: NOTIFICATION_READ_SUCCESS,
                payload: res.data
            })
        }

    } catch(err) {

        dispatch({
            type: NOTIFICATION_READ_FAIL
        })

    }
}

