function ProfileHeader() {
    return (
        <div className="profile_container">
            <div className="profile_header">
                <div className="profile_image_container">
                    <div className="profile_image">
                        object
                    </div>
                </div>
                <div className="profile_content">
                    <div className="profile_username">
                        <p>Username</p>
                    </div>
                    <div className="follower_following">
                        <p>Following</p>
                        <p>Followers</p>
                    </div>
                </div>
            </div>
            <div className="follow_button_container">
                <button className="follow_button"/>
            </div>
            
        </div>
    )
}

export default ProfileHeader
