import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";

function ProfileUser({ user, myUser }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (myUser.following.includes(user._id)) {
      setIsFollowed(true);
    }
  }, [myUser, user]);

  const handleFollow = async () => {
    setIsFollowed((current) => !current);
    const response = await fetch(`${API_URL}/profile/${user._id}/follow`, {
      method: "PUT",
    });
    const responseObj = await response.json();
    setCurrentUser(responseObj[0]);
    console.log(responseObj);
  };

  return (
    <div className="ProfileUser">
      <div className="profileUserPreview">
        <img src={user.pfpUrl} alt="pfp" />
        <div className="profileDetails">
          <h3>{user.displayName}</h3>
          {user.bio && <p>{user.bio}</p>}
        </div>
      </div>
      <div className="profileOptions">
        <Link to={`/profile/${user._id}/followers`}>
          <strong>{currentUser.followers.length}</strong> Followers
        </Link>
        <Link to={`/profile/${user._id}/following`}>
          <strong>{currentUser.following.length}</strong> Following
        </Link>
      </div>
      {isFollowed ? (
        <button onClick={handleFollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </div>
  );
}

ProfileUser.propTypes = {
  user: PropTypes.object,
  myUser: PropTypes.object,
};

export default ProfileUser;
