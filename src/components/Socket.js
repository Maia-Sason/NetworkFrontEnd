import React, { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { connect } from 'react-redux'
import { receive } from '../actions/notification'

const Socket = ({receive}) => {
    const [client, reconnectClient] = useState(new W3CWebSocket(`${process.env.REACT_APP_NOTIFICATION}`))

    useEffect(() => {
        client.onopen = () => {
        console.info("Socket is connected.");
        }

        client.onerror = () => {
        console.error("Error occured while connecting to socket")
        }

        client.onclose = () => {
        console.log("Websocket connection terminated.")
        }
        
        client.onmessage = async (res) => {
            console.info("client received message: ");
            const result = JSON.parse(res.data)
            console.log(result.message)
            receive(result.message)
            // save new item into a redux state?
        }
    }, [])



    return (
        null
    )
}


export default connect(null,  {receive} )(Socket)