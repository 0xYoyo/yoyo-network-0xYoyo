import { PropTypes } from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { API_URL } from "../../utils/config";
import { AiOutlineEdit } from "react-icons/ai";
import EditProfile from "./EditProfile";

function ProfileUser({ myUser }) {
  const [currentUser, setCurrentUser] = useState(myUser);
  const [editActive, setEditActive] = useState(false);

  const handleStatusChange = () => {
    setEditActive((current) => !current);
  };

  const handleUpdateUser = (resObj) => {
    setCurrentUser(resObj);
    setEditActive(false);
  };

  const closeEdit = () => {
    setEditActive(false);
  };

  return (
    <div className="ProfileUser">
      <div className="profileUserPreview">
        <img src={currentUser.pfpUrl} alt="pfp" />
        <div className="profileDetails">
          <h3>{currentUser.displayName}</h3>
          {currentUser.bio && <p>{currentUser.bio}</p>}
        </div>
      </div>
      <div className="profileOptions">
        <Link to={`/profile/${currentUser._id}/followers`}>
          <strong>{currentUser.followers.length}</strong> Followers
        </Link>
        <Link to={`/profile/${currentUser._id}/following`}>
          <strong>{currentUser.following.length}</strong> Following
        </Link>
      </div>
      <button onClick={handleStatusChange}>
        <AiOutlineEdit />
        Edit
      </button>
      {editActive && (
        <EditProfile
          currentUser={currentUser}
          handleUpdateUser={handleUpdateUser}
          closeEdit={closeEdit}
        />
      )}
    </div>
  );
}

ProfileUser.propTypes = {
  user: PropTypes.object,
  myUser: PropTypes.object,
};

export default ProfileUser;
