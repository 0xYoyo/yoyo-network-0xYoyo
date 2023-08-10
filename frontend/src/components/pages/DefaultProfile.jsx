import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import DefaultProfileUser from "../parts/DefaultProfileUser";
import Post from "../parts/Post";

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
              <Post post={post} />
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default DefaultProfile;
