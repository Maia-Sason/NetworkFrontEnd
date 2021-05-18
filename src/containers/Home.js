import axios from 'axios';
import React, { useState, useEffect } from 'react'
import PostBox from '../components/PostBox'


const Home = () => {
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

    return ( 
   <div>
        <PostBox getPosts={getPosts} posts={posts} loaded={loaded} />
    </div>
    )
}

export default Home