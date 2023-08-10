import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";

function User({ user, myUser }) {
  const [isFollowed, setIsFollowed] = useState(false);

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
    console.log(responseObj);
  };

  return (
    <div className="User">
      <Link to={`/profile/${user._id}`}>
        <div className="userPreview">
          <img src={user.pfpUrl} alt="pfp" /> {user.displayName}
        </div>
      </Link>
      {isFollowed ? (
        <button onClick={handleFollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object,
  myUser: PropTypes.object,
};

export default User;
