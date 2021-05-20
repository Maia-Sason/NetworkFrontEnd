import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
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

    const onSubmit = e => {
        console.log(editForm)
        e.preventDefault()
        update(content, id)
        setBodyPost(content);
        setEditing(!editing);
    }

    const handleClick = (e) => {
        setEditing(!editing);
    }

    // liking post
    const likeClick = (e) => {
        setLike(!originalLike);
        like(id);
    }

    const EditPost = (
        <>
        <form onSubmit={e => onSubmit(e)}>
            <input name="content" className="registration_input" value={content} onChange={e => onChange(e)}></input>
        </form>
        </>
    )

    const AuthLiked = (
        <>
        <span> 
            <FontAwesomeIcon className={`like_auth ${originalLike ? '' : 'like_auth_active' }`} onClick={(e) => likeClick()} icon={faHeart} color={"grey"}>
            </FontAwesomeIcon>
        </span>
        <span>{originalLike ? likes - 1 : likes}</span>
        </>
    )

    const unAuth = (
        <>
        <span> 
            <FontAwesomeIcon icon={faHeart} color={"grey"}/>
        </span>
        <span>{likes}</span>
        </>
    )

    const Auth = (
        <>
        <span> 
            <FontAwesomeIcon className={`like_auth ${originalLike && 'like_auth_active'}`} onClick={(e) => likeClick()} icon={faHeart} color={"grey"}/>
        </span>
        <span>{originalLike ? likes + 1 : likes}</span>
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
                    <div className="username_post"><p>{username}</p></div>
                    <div className="date_post"><p>{timestamp}</p></div>
                </div>
            </div>
            <div className="break"></div>
            <div className="body_section">
                {editing ? EditPost : <span>{bodyPost}</span>}
                <div className="like_container">
                    {isAuthenticated ? alreadyLike ? AuthLiked : Auth : unAuth}
                    {sessionUser.username === username &&
                    <button onClick={(e) => handleClick()} value={"edit"}> {editing ? 'X' : 'Edit' }</button>}
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