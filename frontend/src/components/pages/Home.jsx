import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import Post from "../parts/Post";
// import { useInterceptor } from "../../utils/useInterceptor";

function Home() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const response = await fetch(`${API_URL}`, {});
    return response.json();
  };

  useEffect(() => {
    async function fetchPosts() {
      const newPosts = await getPosts();
      setPosts(newPosts);
    }
    fetchPosts();
  }, []);
  console.log(posts);

  return (
    <div className="Home">
      <h1>Home</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post._id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
