import { Routes, Route, Link, Navigate } from "react-router-dom";

import "./App.scss";
import SignUp from "./Pages/SignUp/SignUp";
import Homepage from "./Pages/Homepage/Homepage";
import Login from "./Pages/Login/Login";
import Pending from "./Pages/Pending/Pending";
import WaitingList from "./Pages/WaitingList/WaitingList";
import { useContext, useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import Admins from "./Pages/Admins/Admins";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Users from "./Pages/Users/Users";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import NotFound from "./Pages/NotFound/NotFound";
import Post from "./Pages/Post/Post";
import jwt_decode from "jwt-decode";
import axios from "./assets/axios/axios";
import { ImpactStore } from "./store/ImpactStore";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";


function App() {
  const { user, setUser } = useContext(ImpactStore);

  let navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loader, setLoader] = useState(true);

  const redirectTo = (route) => <Navigate replace to={route} />;
  // useEffect(() => {
  //   if (
  //     !cookies.token &&
  //     location.pathname != "/login" &&
  //     location.pathname != "/signup"
  //   )
  //     navigate("/login");
  // }, [cookies.token]);

  useEffect(() => {
    if (cookies.token) {
      setLoader(true);
      const userId = jwt_decode(cookies.token).userId;

      axios
        .get(
          `/users/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        )
        .then((response) => {
          // handle success
          console.log(response);
          setCookie("status", response.data.status);
          setCookie("zoneRole", response.data.zoneRole);
          setCookie("zoneRoleOn", response.data.zoneRoleOn);
          setCookie("countyId", response.data.countyId);
          setCookie("villageId", response.data.villageId);
          setCookie("localityId", response.data.localityId);
          setUser({
            ...response.data,
            token: cookies.token
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          setLoader(false);
          // always executed
        });
    }
    else {
      setLoader(false);
    }
  }, [location])

  useEffect(() => {
    console.log(user);
  }, [user])

  // const redirectCheck = (page) => {
  //   // alert(user.token)
  //   // return function () {

  //   // };
  // }

  return (
    <div className="App">
      {
        loader == false ? <>
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
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pending"
              element={user.token && user.status == "IN_ASTEPTARE" ? <Pending /> : redirectTo("/")}
            />
            {/* <Route
              path="/create-admins"
              element={
                cookies && cookies.token ? <Admins /> : redirectTo("/login")
              }
            /> */}
            <Route
              path="/waiting-list"
              element={
                <ProtectedAdminRoute>
                  <WaitingList />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedAdminRoute>
                  <Users />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <ProtectedRoute>
                  <Post />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
          : ""
      }

    </div>
  );
}



export default App;
