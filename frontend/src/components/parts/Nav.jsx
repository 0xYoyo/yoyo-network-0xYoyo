import { useState } from "react";
import {
  AiOutlineGlobal,
  AiOutlineHighlight,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import NewPost from "./NewPost";
import { API_URL } from "../../utils/config";
import { logout } from "../../utils/authService";

function Nav() {
  const [newPostActive, setNewPostActive] = useState(false);
  const navigate = useNavigate();

  const handleNewPost = () => {
    setNewPostActive((current) => !current);
  };
  const closeNewPost = () => {
    setNewPostActive(false);
  };

  const handleLogout = async () => {
    const response = await fetch(`${API_URL}/logout`, { method: "PUT" });
    if (response.ok) {
      logout();
      navigate("login");
    }
  };

  return (
    <div className="Nav">
      <ul>
        <li>
          <Link to={"/home"}>
            <AiOutlineHome /> Home
          </Link>
        </li>
        <li>
          <Link to={"/explore"}>
            <AiOutlineGlobal /> Explore
          </Link>
        </li>
        <li>
          <Link to={"/profile"}>
            <AiOutlineUser /> Profile
          </Link>
        </li>
        <li>
          <button onClick={handleNewPost}>
            <AiOutlineHighlight /> New Post
          </button>
        </li>
        <li>
          <button onClick={handleLogout}>
            <AiOutlineLogout /> Log out
          </button>
        </li>
      </ul>
      {newPostActive && <NewPost closeNewPost={closeNewPost} />}
    </div>
  );
}

export default Nav;
