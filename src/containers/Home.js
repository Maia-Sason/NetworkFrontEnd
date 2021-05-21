import axios from 'axios';
import React, { useState, useEffect } from 'react'
import PostBox from '../components/PostBox'
import { connect } from 'react-redux'
import Compose from "../components/Compose.js"


const Home = (isAuthenticated) => {
    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([])
   
    const fetchData = async () => {
        let res
        try {
            res = await axios.get(`${process.env.REACT_APP_API_URL}/network/posts`)
        } catch(err) {}

        return res;
    };

    const getPosts = async () => {
        const tasksFromServer = await fetchData()
        setPosts(tasksFromServer.data.iterate[1]);
    }

    useEffect(() => {
        getPosts();
        setLoaded(true);
    }, []);

    useEffect(() => {
        setLoaded(true);
    }, [posts])

    const updatePost = async () => {
        setLoaded(false);
        getPosts();
        
    }

    const authComp = (
        <>
            <Compose updatePost={updatePost}/>
                <div className="break_out"/>
        </>
    )

    return ( 
   <div>
       <div className="compose_home_container">
        {isAuthenticated && authComp}
        </div>
        <div className="postbox_home_container">
        <PostBox getPosts={getPosts} updatePost={updatePost} setPosts={setPosts} posts={posts} loaded={loaded} />
        </div>
    </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, )(Home)