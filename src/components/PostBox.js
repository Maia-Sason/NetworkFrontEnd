import React, { useState, useEffect } from 'react'
import Post from "./Post.js"
import Compose from "./Compose.js"
import axios from 'axios'
import Load from './Load.js'
import { connect } from 'react-redux'

function PostBox({isAuthenticated, loaded, posts, getPosts}) {

    const postList = posts.map((post, index) => {
        return (
            <Post body={post.content} username={post.creator} likes={post.likes} timestamp={post.timestamp} id={post.id}></Post>
        )
    })

    const authComp = (
        <>
            <Compose/>
                <div className="break_out"/>
        </>
    )
    

    return (
    <div className="postBox_container">
        {isAuthenticated && authComp} 
        
            {loaded ? postList : <Load/>}
    </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(PostBox)