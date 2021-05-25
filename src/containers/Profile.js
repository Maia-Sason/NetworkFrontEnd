import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import PostBox from '../components/PostBox';
import Load from '../components/Load';
import ProfileHeader from '../components/ProfileHeader';
import { connect } from 'react-redux';
import { follow } from '../actions/follow';
import { set } from 'js-cookie';



const Profile = ({sessionUser, isAuthenticated, follow}) => {
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

    const [alreadyFollowing, setAlreadyFollowing] = useState(false);

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
        if (sessionUser.follows !== undefined) {
            setAlreadyFollowing(sessionUser.follows.includes(userProfile.id));
        }
        setLoadedUser(true);
    }, [userProfile]);


    useEffect(() => {
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

    const followAction = () => {
        follow(userProfile.id);
    }

    return ( 
        <div>
            <div>
                
                {loadedUser ? <ProfileHeader followAction={followAction} follow={follow} sessionUser={sessionUser} isAuthenticated={isAuthenticated} username={userProfile.username} alreadyFollowing={alreadyFollowing} followers={userProfile.followers} following={userProfile.following} id={userProfile.id}/> : <Load/>}
            </div>
            <div className="center">
            <div className="postbox_home_container">
            {loadedPosts ? <PostBox maxPage={maxPage} hasNext={nextButton} hasPrev={previousButton} page={page} setPageLoad={setPageLoad} getPosts={getPosts} updatePost={updatePost} setPosts={setPosts} posts={posts} loaded={loadedPosts} /> : <Load/>}
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    sessionUser: state.user,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {follow})(Profile);