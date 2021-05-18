import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';

function Post({body, username, likes, timestamp, sessionUser}) {
    return (
        <div className="post_container">
            <div className="profile_section">
                <div className="image_circle">
                    <div className="inner_image"></div>
                    <div className="inner_image2"></div>
                </div>
                <div className="header_post">
                    <div className="username_post"><p>{username}</p></div>
                    <div className="date_post"><p>{timestamp}</p></div>
                </div>
            </div>
            <div className="break"></div>
            <div className="body_section">
                <span>{body}</span>
                <div className="like_container">
                    <span><FontAwesomeIcon icon={faHeart} color={"grey"}>
                        </FontAwesomeIcon>
                    </span>
                    <span>{likes}</span>
                    {sessionUser.username === username &&
                    <button value={"edit"}>edit</button>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    sessionUser: state.user
})

export default connect(mapStateToProps,)(Post);