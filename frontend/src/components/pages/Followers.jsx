import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import User from "../parts/User";
import { useParams } from "react-router-dom";
import "../../styles/Follow.css";
import NothingYet from "../parts/NothingYet";

function Followers() {
  const { userid } = useParams();
  const [users, setUsers] = useState([]);
  const [myUser, setMyUser] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        `${API_URL}/profile/${userid}/followers`,
        {}
      );
      return response.json();
    };
    async function fetchUsers() {
      const [newUsers, newMyUser] = await getUsers();
      setUsers(newUsers.followers);
      setMyUser(newMyUser);
    }
    fetchUsers();
  }, [userid]);

  return (
    <div className="FollowPage">
      <h1>Followers</h1>
      {users.length == 0 && <NothingYet />}
      <ul className="users">
        {users.map((user) => (
          <li key={user._id}>
            <User user={user} myUser={myUser} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Followers;
