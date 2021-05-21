import React, { useState, useEffect } from 'react'
import Post from "./Post.js"
import Compose from "./Compose.js"
import axios from 'axios'
import Load from './Load.js'
import { connect } from 'react-redux'

function PostBox({isAuthenticated, user, loaded, posts, newPost}) {
    const [postList, setPostList] = useState([posts])
    const [newPostLoad, setNewPost] = useState(true)

    // useEffect(() => {
    //     setPostList(posts);
    //     console.log(postList);
    // },[postList])
    // console.log(posts)
   
    // const postListDisplay = (
    
    // )

    const reloadPosts = () => {
        // const newList = 
        newPostLoad ? 
        console.log(posts.unshift({newPost})) : console.log("loading");
        setNewPost(false);
        // setPostList(newList);
    }


    const authComp = (
        <>
            <Compose reloadPosts={reloadPosts} setNewPost={setNewPost}/>
                <div className="break_out"/>
        </>
    )
    

    return (
    <div className="postBox_container">
        {loaddd && results}
        {isAuthenticated && authComp} 
            {loaded ? 
            postList.map((post, index) => {
                return (
                    <Post body={post.content} username={post.creator} likes={post.likes} timestamp={post.timestamp} id={post.id}></Post>
                )
            })
             : <Load/>}
    </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user,
    newPost: state.user.post
})

export default connect(mapStateToProps, null)(PostBox)