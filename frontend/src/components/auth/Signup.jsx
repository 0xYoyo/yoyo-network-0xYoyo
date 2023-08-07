import { Link } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../../utils/config";
import { handleForm } from "../../utils/formHandler";
import { setLocalStorage } from "../../utils/authService";

function Signup() {
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      await handleForm(form);
      //  useNavigate does not refresh route therefore have to reload manually
      window.location.pathname = "/";
    } catch (error) {
      setErrors(`${error}`);
    }
  };

  const handleGuest = async () => {
    try {
      const response = await fetch(`${API_URL}/demo`, { method: "POST" });
      const responseObj = await response.json();
      console.log(responseObj);
      setLocalStorage(responseObj);
      //  useNavigate does not refresh route therefore have to reload manually
      window.location.pathname = "/";
    } catch (error) {
      setErrors(`${error}`);
    }
  };

  return (
    <div className="PostForm">
      <h1>Sign up</h1>
      <form
        action={`${API_URL}/register`}
        method="POST"
        onSubmit={handleSubmit}
      >
        <ul>
          <li>
            <label htmlFor="displayName">Display name:</label>
            <input type="text" id="displayName" name="displayName" required />
          </li>
          <li>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" required />
          </li>
        </ul>
        <button>Sign up</button>
      </form>
      <p>
        {"Already have an account? "} <Link to={"/login"}>Log in</Link>
      </p>
      <button onClick={handleGuest}>Enter as guest</button>

      {errors && <p>{errors}</p>}
    </div>
  );
}

export default Signup;
