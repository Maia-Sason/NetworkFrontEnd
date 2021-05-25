import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';


function ProfileHeader({sessionUser, alreadyFollowing, isAuthenticated, followAction, username, following, followers, follow, id}) {
    const [followed, setFollowed] = useState(false);
    
    const handleClick = (e) => {
        setFollowed(!followed);
        followAction();
    }

    const AuthFollowing = (
        <>
        {followed ? 
            <Button variant="outline-primary" onClick={(e) => handleClick()}> Follow</Button> :
            <Button variant="outline-primary" onClick={(e) => handleClick()} active> Unfollow </Button>
        }
        </>
    )

    const Auth = (
        <>
        {followed ? 
            <Button variant="outline-primary" onClick={(e) => handleClick()} active> Unfollow </Button> :
            <Button variant="outline-primary" onClick={(e) => handleClick()}> Follow</Button>
        }
        </>
    )

    const FollowingNums = (
        <>
            <p>Followers: <p> {followed ? followers - 1 : followers }</p></p> 
        </>
    )

    const Nums = (
        <>
            <p>Followers: <p> {followed ? followers + 1 : followers }</p></p> 
        </>
    )

    const userProfile = (
        <>
        <div className="profile_container">
        <div className="profile_header">
            <div className="profile_image_container">
                <div className="profile_image">
                    <div className="image_circle">
                    <div className="inner_image"></div>
                    <div className="inner_image2"></div>
                </div>
                </div>
            </div>
            <div className="profile_content">
                <div className="profile_username">
                    <p>{username}</p>
                </div>
                <div className="follower_following">
                    <p>Following: <p> {following}</p></p>
                    {alreadyFollowing ? FollowingNums : Nums}
                </div>
            </div>
        </div>
        {isAuthenticated && sessionUser.id !== id && <div className="follow_button_container">
            {alreadyFollowing ? AuthFollowing : Auth}
        </div>}
    </div>
    <div className="break_out"/>
    </>
    )
    
    return (
        <> 
        {userProfile}
        </>
    )
}

export default ProfileHeader;