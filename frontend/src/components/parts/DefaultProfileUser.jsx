import { PropTypes } from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { API_URL } from "../../utils/config";
import { AiOutlineEdit } from "react-icons/ai";

function ProfileUser({ myUser }) {
  const [currentUser, setCurrentUser] = useState(myUser);

  const handleEdit = async () => {
    setCurrentUser({ todo: "Todo" });
  };

  return (
    <div className="ProfileUser">
      <div className="profileUserPreview">
        <img src={currentUser.pfpUrl} alt="pfp" />
        <div className="profileDetails">
          <h4>{currentUser.displayName}</h4>
          {currentUser.bio && <p>{currentUser.bio}</p>}
        </div>
      </div>
      <div className="profileOptions">
        <Link to={`/profile/${currentUser._id}/followers`}>
          <strong>{currentUser.followers.length}</strong> Followers
        </Link>
        <Link to={`/profile/${currentUser._id}/following`}>
          <strong>{currentUser.following.length}</strong>Following
        </Link>
      </div>
      <button onClick={handleEdit}>
        <AiOutlineEdit />
        Edit
      </button>
    </div>
  );
}

ProfileUser.propTypes = {
  user: PropTypes.object,
  myUser: PropTypes.object,
};

export default ProfileUser;
