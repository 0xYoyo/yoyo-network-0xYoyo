import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Login from "../components/auth/Login.jsx";
import Signup from "../components/auth/Signup.jsx";
import Home from "../components/pages/Home.jsx";
import Explore from "../components/pages/Explore.jsx";
import Profile from "../components/pages/Profile.jsx";
import Followers from "../components/pages/Followers.jsx";
import Following from "../components/pages/Following.jsx";
import DefaultProfile from "../components/pages/DefaultProfile.jsx";
import ErrorPage from "../components/pages/ErrorPage.jsx";
import { isLoggedIn } from "./authService.js";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn() ? <App /> : <Login />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "explore", element: <Explore /> },
        { path: "profile", element: <DefaultProfile /> },
        { path: "profile/:userid", element: <Profile /> },
        { path: "profile/:userid/following", element: <Following /> },
        { path: "profile/:userid/followers", element: <Followers /> },
        { path: "post/:postid", element: <Home /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/sign-up", element: <Signup /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
