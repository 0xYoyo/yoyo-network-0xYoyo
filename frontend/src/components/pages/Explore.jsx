import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import User from "../parts/User";
function Explore() {
  const [users, setUsers] = useState([]);
  const [myUser, setMyUser] = useState({});

  const getUsers = async () => {
    const response = await fetch(`${API_URL}/explore`, {});
    return response.json();
  };

  useEffect(() => {
    async function fetchUsers() {
      const [newUsers, newMyUser] = await getUsers();
      setUsers(newUsers);
      setMyUser(newMyUser);
    }
    fetchUsers();
  }, []);

  return (
    <div className="Explore">
      <h1>Explore</h1>
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

export default Explore;
