import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import Post from "../parts/Post";
import "../../styles/Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  const getPosts = async () => {
    const response = await fetch(`${API_URL}`, {});
    return response.json();
  };

  useEffect(() => {
    async function fetchPosts() {
      const [newPosts, newUser] = await getPosts();
      setPosts(newPosts);
      setUser(newUser);
    }
    fetchPosts();
  }, []);

  return (
    <div className="Home">
      <h1>Home</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post._id}>
            <Post post={post} user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
