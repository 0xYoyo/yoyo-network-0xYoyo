import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import DefaultProfileUser from "../parts/DefaultProfileUser";
import Post from "../parts/Post";
import "../../styles/Profile.css";

function DefaultProfile() {
  const [myUser, setMyUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/profile`, {});
      return response.json();
    };
    async function fetchUser() {
      const newMyUser = await getUser();
      newMyUser.posts.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setMyUser(newMyUser);
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  return (
    !isLoading && (
      <div className="Profile">
        <DefaultProfileUser myUser={myUser} />
        <ul className="posts">
          {myUser.posts.map((post) => (
            <li key={post._id}>
              <Post post={post} user={myUser} />
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default DefaultProfile;
