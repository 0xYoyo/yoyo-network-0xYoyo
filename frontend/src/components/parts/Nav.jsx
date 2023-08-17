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
import "../../styles/Nav.css";

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
      <ul id="navList">
        <li className="logoContainer">
          <Link to={"/home"}>
            <img
              src="../../../public/logoyoyo.png"
              alt="logo"
              className="logo"
            />
          </Link>
        </li>
        <li>
          <Link to={"/home"} className="navLink">
            <AiOutlineHome className="icon" />
            <div>Home</div>
          </Link>
        </li>

        <li>
          <Link to={"/profile"} className="navLink">
            <AiOutlineUser className="icon" /> <div>Profile</div>
          </Link>
        </li>
        <li>
          <Link to={"/explore"} className="navLink">
            <AiOutlineGlobal className="icon" /> <div>Explore</div>
          </Link>
        </li>
        <li>
          <button onClick={handleNewPost} className="navBtn">
            <AiOutlineHighlight className="icon" /> <div>New Post</div>
          </button>
        </li>
        <li className="logout">
          <button onClick={handleLogout} className="navBtn">
            <AiOutlineLogout className="icon" /> <div>Log out</div>
          </button>
        </li>
      </ul>
      {newPostActive && <NewPost closeNewPost={closeNewPost} />}
    </div>
  );
}

export default Nav;
