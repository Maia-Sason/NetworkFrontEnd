import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PostBox from '../components/PostBox';
import Load from '../components/Load.js'

const Follow = () => {
    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [nextButton, setNextButton] = useState(false);
    const [previousButton, setPreviousButton] = useState(false);

    const fetchData = async (number) => {
        let res
        try {
            res = await axios.get(`${process.env.REACT_APP_API_URL}/network/following/${number}`)
        } catch(err) {}

        return res;
    };

    const getPosts = async (number) => {
        const tasksFromServer = await fetchData(number)
        console.log(tasksFromServer);
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

    const setPageLoad = async (number) => {
        setLoaded(false);
        getPosts(number);
    }

    return ( 
        <div>
           <div className="postbox_home_container">
                {loaded ? <PostBox maxPage={maxPage} hasNext={nextButton} hasPrev={previousButton} page={page} setPageLoad={setPageLoad} getPosts={getPosts} setPosts={setPosts} posts={posts} loaded={loaded} /> : <Load/> }
            </div>
        </div>
    )
}

export default Follow
