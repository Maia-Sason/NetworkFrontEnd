import React, { useState, useEffect } from 'react'
import Post from "./Post.js"
import Compose from "./Compose.js"
import axios from 'axios'
import Load from './Load.js'
import { connect } from 'react-redux'

function PostBox({isAuthenticated, user, updatePost, loaded, setPosts, posts, newPost}) {

    const postsToDisplay = (
        posts.map((post, id) => {
            return (
                <Post key={id} body={post.content} username={post.creator} likes={post.likes} timestamp={post.timestamp} id={post.id}></Post>
            )
        })
        
    )

    return (
    <div className="postBox_container">
            {loaded ? postsToDisplay : <Load/>}
    </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user,
    newPost: state.user.post
})

export default connect(mapStateToProps, null)(PostBox)