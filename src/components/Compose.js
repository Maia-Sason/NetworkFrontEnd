import { set } from 'js-cookie';
import React, { useState } from 'react'
import { create } from '../actions/post';
import { connect } from 'react-redux';
import CSRFToken from '../components/CSRFToken';

function Compose({ create }) {
    const [composeForm, setComposeForm] = useState({
        content: ''
    })

    const {content} = composeForm
    
    const onChange = e => setComposeForm({...composeForm, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        create(content)
        setComposeForm({content: ""});
    }

    return (
        <div className="compose_container">
            <div className="compose_section">
                <div className="image_circle"><div className="inner_image"></div><div className="inner_image2"></div></div>
                <form onSubmit={e => onSubmit(e)}>
                <CSRFToken/>
                <input type="text" onChange={e => onChange(e)} name="content" className="compose_in" value={content} placeholder="What's on your mind?" required></input>
                
                </form>
            </div>
        </div>
    )
}

export default connect(null,  {create} )(Compose)