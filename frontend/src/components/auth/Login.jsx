import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import { handleAuthForm } from "../../utils/authFormHandler";
import { setLocalStorage } from "../../utils/authService";
import "../../styles/Auth.css";

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (window.location.pathname != "/login") {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      await handleAuthForm(form);
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
    <div className="AuthForm">
      <h1>Log In</h1>
      <form action={`${API_URL}/login`} method="POST" onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" required />
          </li>
        </ul>
        <button>Log in</button>
      </form>
      <p>
        {"Don't have an account? "} <Link to={"/sign-up"}>Sign up</Link>
      </p>
      <button onClick={handleGuest}>Enter as guest</button>

      {errors && <p>{errors}</p>}
    </div>
  );
}

export default Login;
