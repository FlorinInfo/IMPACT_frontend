import { Routes, Route, Link, Navigate } from "react-router-dom";

import "./App.scss";
import SignUp from "./Pages/SignUp/SignUp";
import Homepage from "./Pages/Homepage/Homepage";
import Login from "./Pages/Login/Login";
import Pending from "./Pages/Pending/Pending";
import WaitingList from "./Pages/WaitingList/WaitingList";
import { useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import Admins from "./Pages/Admins/Admins";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Users from "./Pages/Users/Users";
import NavigationBar from "./components/NavigationBar/NavigationBar";

function App() {
  let navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const redirectToLogin = (route) => <Navigate replace to={route} />;
  // useEffect(() => {
  //   if (
  //     !cookies.token &&
  //     location.pathname != "/login" &&
  //     location.pathname != "/signup"
  //   )
  //     navigate("/login");
  // }, [cookies.token]);

  return (
    <div className="App">
      {cookies.token && location.pathname != "/pending" ? (
        <NavigationBar currentPage={location.pathname} />
      ) : (
        ""
      )}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            cookies && cookies.token ? <Homepage /> : redirectToLogin("/login")
          }
        />
        <Route
          path="/pending"
          element={
            cookies && cookies.token ? <Pending /> : redirectToLogin("/login")
          }
        />
        <Route
          path="/create-admins"
          element={
            cookies && cookies.token ? <Admins /> : redirectToLogin("/login")
          }
        />
        <Route
          path="/waiting-list"
          element={
            cookies && cookies.token ? (
              <WaitingList />
            ) : (
              redirectToLogin("/login")
            )
          }
        />
        <Route
          path="/users"
          element={
            cookies && cookies.token ? (
              <Users />
            ) : (
              redirectToLogin("/login")
            )
          }
        />
        <Route
          path="/create-post"
          element={
            cookies && cookies.token ? (
              <CreatePost />
            ) : (
              redirectToLogin("/login")
            )
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
