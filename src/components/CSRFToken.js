import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');

    useEffect(() => {
        const getCookie = (name) => {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                console.log(cookies);
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    console.log(cookie.substring(0, name.length + 1))
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            } else {
                console.log('error with document.cookie')
            }
            console.log(cookieValue)
            return cookieValue;
        }

        const fetchData = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}/network/csrf_cookie`)
                console.log("successfully fetched csrf");
            } catch(err) {
                console.error("an error occured fetching csrf");
            }
        };

        fetchData();
        setcsrftoken(getCookie("csrftoken"));
        console.log(getCookie('csrftoken'))
        console.log(csrftoken);
    }, []);

    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
    )
}

export default CSRFToken;