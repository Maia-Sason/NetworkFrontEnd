import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Pagination from 'react-bootstrap/Pagination'
import Post from "./Post.js"
import Compose from "./Compose"


import Load from './Load.js'


function PostBox({isAuthenticated, user, updatePost, loaded, setPosts, posts, newPost, hasNext, hasPrev, setPageLoad, page, maxPage}) {

    const postsToDisplay = (
        posts.map((post, id) => {
            return (
                <Post key={id} body={post.content} username={post.creator} likes={post.likes} timestamp={post.timestamp} id={post.id}></Post>
            )
        })
        
    )
    const paginationBasic = (
        <div className="pagination_location">
            <Pagination>
                {page != 1 && <Pagination.First onClick={() => setPageLoad(1)}/>}
                {hasPrev && <Pagination.Prev onClick={() => setPageLoad(page - 1)} />}
                <Pagination.Item active>{page}</Pagination.Item>
                {hasNext && <Pagination.Next onClick={() => setPageLoad(page + 1)} />}
                {page != maxPage && <Pagination.Last onClick={() => setPageLoad(maxPage)}/>}
                
            </Pagination>
        </div>
      );
      

    return (
    <div>
    <div className="postBox_container">
            {loaded ? postsToDisplay : <Load/>}
            {paginationBasic}
            
    </div>
        
    </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user,
    newPost: state.user.post
})

export default connect(mapStateToProps, null)(PostBox)