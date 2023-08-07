import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import { handleForm } from "../../utils/formHandler";

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
      await handleForm(form);
      //  useNavigate does not refresh route therefore have to reload manually
      window.location.pathname = "/";
    } catch (error) {
      console.log("This is " + error);
      setErrors(`${error}`);
    }
  };

  return (
    <div className="PostForm">
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
      {errors && <p>{errors}</p>}
    </div>
  );
}

export default Login;
