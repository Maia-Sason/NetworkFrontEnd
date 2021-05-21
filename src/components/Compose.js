import { set } from 'js-cookie';
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { create } from '../actions/post';
import { connect } from 'react-redux';
import CSRFToken from '../components/CSRFToken';

function Compose({ create, updatePost }) {
    const [composeForm, setComposeForm] = useState({
        content: ''
    })

    const {content} = composeForm
    
    const onChange = e => {
        setComposeForm({...composeForm, [e.target.name]: e.target.value })
    }

    const handleEnter = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit()
        }
    }

    const onSubmit = e => {
        // e.preventDefault()
        if (content.length > 0) {
            create(content)
            setComposeForm({content: ""});
            // setNewPost(true);
            updatePost();
            
        }
    }

    return (
        <div className="compose_container">
            <div className="compose_section">
                <div className="profile">
                    <div className="image_circle">
                        <div className="inner_image"/>
                        <div className="inner_image2"/>
                    </div>
                </div>
                <form className="flex_compose">
                <CSRFToken/>
                <TextareaAutosize maxRows={4} onKeyPress={e => handleEnter(e)} type="text" onChange={e => onChange(e)} name="content" className="compose_in" value={content} placeholder="What's on your mind?" required></TextareaAutosize>
                
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(null,  {create} )(Compose)