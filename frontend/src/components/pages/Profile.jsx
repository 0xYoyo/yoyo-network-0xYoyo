import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import { useNavigate, useParams } from "react-router-dom";
import ProfileUser from "../parts/ProfileUser";
import Post from "../parts/Post";

function Profile() {
  const { userid } = useParams();
  const [user, setUser] = useState({});
  const [myUser, setMyUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/profile/${userid}`, {});
      return response.json();
    };
    async function fetchUser() {
      const [newUser, newMyUser] = await getUser();
      if (newUser._id == newMyUser._id) {
        navigate("/profile");
      }
      setUser(newUser);
      setMyUser(newMyUser);
      setIsLoading(false);
    }
    fetchUser();
  }, [userid, navigate]);

  return (
    !isLoading && (
      <div className="Profile">
        <ProfileUser user={user} myUser={myUser} />
        <ul className="posts">
          {user.posts.map((post) => (
            <li key={post._id}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default Profile;
