import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import { Link } from "react-router-dom";
import Post from "../parts/Post";
import { useInterceptor } from "../../utils/useInterceptor";

function Home() {
  const [posts, setPosts] = useState([]);
  const interceptor = useInterceptor();
  const getPosts = async () => {
    const response = await fetch(`${API_URL}`, {});
    return response.json();
  };

  useEffect(() => {
    console.log(interceptor);
    async function fetchPosts() {
      const newPosts = await getPosts();
      setPosts(newPosts);
    }
    fetchPosts();
  }, [interceptor]);
  console.log(posts);

  return (
    <div className="Home">
      <h1>Home</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>
              <Post post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
