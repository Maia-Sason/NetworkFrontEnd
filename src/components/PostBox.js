import react, { useState, useEffect } from 'react'
import Post from "./Post.js"
import Compose from "./Compose.js"
import axios from 'axios'
import Load from './Load.js'
import { connect } from 'react-redux'

function PostBox({isAuthenticated}) {
    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([])
    const [created, setCreated] = useState(false)
    
    const createdPost = () => {
        setCreated(true)
        getPosts()
        setCreated(false)

    }
    
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

    const postList = posts.map((post, index) => {
        return (
            <Post body={post.content} username={post.creator} likes={post.likes} timestamp={post.timestamp}></Post>
        )
    })

    console.log(posts)

    const authComp = (
        <>
            <Compose createdPost={createdPost}/>
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