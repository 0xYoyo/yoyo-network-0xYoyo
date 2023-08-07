import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "./authService";

export function useInterceptor() {
  const navigate = useNavigate();
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    let [resource, options] = args;
    const jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken) {
      const loginStatus = isLoggedIn();
      if (loginStatus === true) {
        options.headers = { ...options.headers, Authorization: jwtToken };
      } else {
        logout();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    const response = await originalFetch(resource, options);
    return response;
  };
}
