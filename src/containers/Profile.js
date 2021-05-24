import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import PostBox from '../components/PostBox';
import Load from '../components/Load';


const Profile = () => {
    const [userProfile, setUserProfile] = useState({
        username: '',
        followers: '',
        following: '',
        id: ''
    });
    const [loadedPosts, setLoadedPosts] = useState(false);
    const [loadedUser, setLoadedUser] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [nextButton, setNextButton] = useState(false);
    const [previousButton, setPreviousButton] = useState(false);

    const id = useParams();
   
    const fetchData = async (number) => {
        let res
        try {
            res = await axios.get(`${process.env.REACT_APP_API_URL}/network/profile/${id.id}/${number}`)
        } catch(err) {}
        return res;
    };

    const getPostsandProfile = async (number) => {
        const tasksFromServer = await fetchData(number)
        setUserProfile(tasksFromServer.data);

        setPosts(tasksFromServer.data.user_posts.posts);
        setMaxPage(tasksFromServer.data.user_posts.max);
        setPage(tasksFromServer.data.user_posts.page);
        setPreviousButton(tasksFromServer.data.user_posts.previous);
        setNextButton(tasksFromServer.data.user_posts.next);
        setMaxPage(tasksFromServer.data.user_posts.max);
    }

    const getPosts = async (number) => {
        const tasksFromServer = await fetchData(number)
        setPosts(tasksFromServer.data.user_posts.posts);
        setMaxPage(tasksFromServer.data.user_posts.max);
        setPage(tasksFromServer.data.user_posts.page);
        setPreviousButton(tasksFromServer.data.user_posts.previous);
        setNextButton(tasksFromServer.data.user_posts.next);
        setMaxPage(tasksFromServer.data.user_posts.max);
    }

    useEffect(() => {
        console.log(userProfile);
        setLoadedUser(true);
    }, [userProfile]);

    useEffect(() => {
        console.log(posts);
        setLoadedPosts(true);

    }, [posts])

    useEffect(() => {
        getPostsandProfile(1);
    }, []);

    const updatePost = async () => {
        setLoadedPosts(false);
        setPage(page - 1);
        getPosts(1);
    }

    const setPageLoad = async (number) => {
        setLoadedPosts(false);
        getPosts(number);
    }

    return ( 
        <div>
            <div>
                {loadedUser ? `${userProfile.username}, followers: ${userProfile.followers}, following: ${userProfile.following}` : <Load/>}
            </div>
            <div className="postbox_home_container">
            {loadedPosts ? <PostBox maxPage={maxPage} hasNext={nextButton} hasPrev={previousButton} page={page} setPageLoad={setPageLoad} getPosts={getPosts} updatePost={updatePost} setPosts={setPosts} posts={posts} loaded={loadedPosts} /> : <Load/>}
            </div>
        </div>
    )
}

export default Profile