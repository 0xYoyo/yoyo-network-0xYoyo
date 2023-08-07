import { useState } from "react";
import {
  AiOutlineGlobal,
  AiOutlineHighlight,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import NewPost from "./NewPost";

function Nav() {
  const [newPostActive, setNewPostActive] = useState(false);
  const handleNewPost = () => {
    setNewPostActive(true);
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
      </ul>
      {newPostActive && <NewPost />}
    </div>
  );
}

export default Nav;
