import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { update } from '../actions/post';
import { like } from '../actions/post';

function Post({body, id, username, likes, timestamp, sessionUser, sessionLikes, update, isAuthenticated, like}) {
    // Editing post.
    const [originalLike, setLike] = useState(false);
    const [alreadyLike, setAlreadyLike] = useState(false);
    const [editing, setEditing] = useState(false);
    const [bodyPost, setBodyPost] = useState(body);
    const [editForm, setEditForm] = useState({content: body})

    useEffect(() => {
        if (sessionUser.likes !== undefined) {
            setAlreadyLike(sessionUser.likes.includes(id))
        }
    }, []);

    const {content} = editForm

    const onChange = e => setEditForm({...editForm, [e.target.name]: e.target.value })

    const handleEnter = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit()
        }
    }

    const onSubmit = e => {
        if (content.length > 0) {
            console.log(editForm)
            update(content, id)
            setBodyPost(content);
            setEditing(!editing);
        }
    }

    const handleClick = (e) => {
        setEditing(!editing);
        setEditForm({content: body});
    }

    // liking post
    const likeClick = (e) => {
        setLike(!originalLike);
        like(id);
    }

    const EditPost = (
        <>
        <form className="flex_compose">
                <TextareaAutosize maxRows={4} onKeyPress={e => handleEnter(e)} type="text" onChange={e => onChange(e)} name="content" className="compose_in" value={content} placeholder="What's on your mind?" required></TextareaAutosize>
        </form>
        </>
    )

    const AuthLiked = (
        <>
        <span> 
            <FontAwesomeIcon className={`like_auth ${originalLike ? '' : 'like_auth_active' }`} onClick={(e) => likeClick()} icon={faHeart} color={"grey"}>
            </FontAwesomeIcon>
        </span>
        <span className="likes_space">{originalLike ? likes - 1 : likes}</span>
        </>
    )

    const unAuth = (
        <>
        <span> 
            <FontAwesomeIcon icon={faHeart} color={"grey"}/>
        </span>
        <span className="likes_space">{likes}</span>
        </>
    )

    const Auth = (
        <>
        <span> 
            <FontAwesomeIcon className={`like_auth ${originalLike && 'like_auth_active'}`} onClick={(e) => likeClick()} icon={faHeart} color={"grey"}/>
        </span>
        <span className="likes_space">{originalLike ? likes + 1 : likes}</span>
        </>
    )

    return (
        <div className="post_container">
            <div className="profile_section">
                <div className="image_circle">
                    <div className="inner_image"></div>
                    <div className="inner_image2"></div>
                </div>
                <div className="header_post">
                    
                    <div className="post_name_date">
                        <div className="username_post">{username}</div>
                        <div className="date_post">{timestamp}</div>
                    </div>
                    <div className="edit_container">
                        {sessionUser.username === username &&
                        <button className="edit_button" onClick={(e) => handleClick()} value={"edit"}> {editing ? 'X' : 'Edit' }</button>}
                    </div>
                </div>
            </div>
            <div className="break"></div>
            <div className="body_section">
                {editing ? EditPost : <span className="body_content">{bodyPost}</span>}
                <div className="like_container">
                    {isAuthenticated ? alreadyLike ? AuthLiked : Auth : unAuth}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    sessionUser: state.user,
    sessionLikes: state.user.liking,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {update, like})(Post);