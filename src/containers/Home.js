import axios from 'axios';
import React, { useState, useEffect } from 'react'
import PostBox from '../components/PostBox'
import { connect } from 'react-redux'
import Compose from "../components/Compose.js"
import Load from '../components/Load.js'


const Home = ({isAuthenticated}) => {
    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [nextButton, setNextButton] = useState(false);
    const [previousButton, setPreviousButton] = useState(false);
   
    const fetchData = async (number) => {
        let res
        try {
            res = await axios.get(`${process.env.REACT_APP_API_URL}/network/posts/${number}`)
        } catch(err) {}

        return res;
    };

    const getPosts = async (number) => {
        const tasksFromServer = await fetchData(number)
        setPosts(tasksFromServer.data.posts);
        setMaxPage(tasksFromServer.data.max);
        setPage(tasksFromServer.data.page);
        setPreviousButton(tasksFromServer.data.previous);
        setNextButton(tasksFromServer.data.next);
        setMaxPage(tasksFromServer.data.max);
    }

    useEffect(() => {
        getPosts(1);
        setLoaded(true);
    }, []);

    useEffect(() => {
        setLoaded(true);
        console.log(posts)
        console.log(page)
        console.log(previousButton)
        console.log(nextButton)
    }, [posts])

    const updatePost = async () => {
        setLoaded(false);
        setPage(page - 1);
        getPosts(1);
    }

    const setPageLoad = async (number) => {
        setLoaded(false);
        getPosts(number);
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
       {(isAuthenticated) && authComp}
        </div>
        <div className="postbox_home_container">
        {loaded ? <PostBox maxPage={maxPage} hasNext={nextButton} hasPrev={previousButton} page={page} setPageLoad={setPageLoad} getPosts={getPosts} updatePost={updatePost} setPosts={setPosts} posts={posts} loaded={loaded} /> : <Load/> }
        </div>
    </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Home)