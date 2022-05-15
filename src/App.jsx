import { Routes, Route, Link, Navigate } from "react-router-dom";

import "./App.scss";
import SignUp from "./Pages/SignUp/SignUp";
import Homepage from "./Pages/Homepage/Homepage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Login from "./Pages/Login/Login";
import Pending from "./Pages/Pending/Pending";
import WaitingList from "./Pages/WaitingList/WaitingList";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Admins from "./Pages/Admins/Admins";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Users from "./Pages/Users/Users";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import NotFound from "./Pages/NotFound/NotFound";
import Post from "./Pages/PostPage/Post";
import jwt_decode from "jwt-decode";
import axios from "./assets/axios/axios";
import { ImpactStore } from "./store/ImpactStore";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UserSettings from "./Pages/UserSettings/UserSettings";
import Referral from "./Pages/Referral/Referral";
import Invite from "./Pages/Invite/Invite";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";

function App() {
  const { user, setUser } = useContext(ImpactStore);

  let navigate = useNavigate();
  const location = useLocation();
  // const [cookies, setCookie, removeCookie] = useCookies(["token"]);
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
    if (localStorage.getItem("token")) {
      setLoader(true);
      const userId = jwt_decode(localStorage.getItem("token")).userId;

      axios
        .get(`/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          // handle success
          localStorage.setItem("status", response.data.status);
          localStorage.setItem("zoneRole", response.data.zoneRole);
          localStorage.setItem("zoneRoleOn", response.data.zoneRoleOn);
          localStorage.setItem("countyId", response.data.countyId);
          localStorage.setItem("villageId", response.data.villageId);
          localStorage.setItem("localityId", response.data.localityId);
          setUser({
            ...response.data,
            token: localStorage.getItem("token"),
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          setTimeout(() => {
            setLoader(false);
          }, 200);
          // always executed
        });
    } else {
      setLoader(false);
    }
  }, [location]);

  useEffect(() => {}, [user]);

  // const redirectCheck = (page) => {
  //   // alert(user.token)
  //   // return function () {

  //   // };
  // }

  return (
    <div className="App">
      {loader == false ? (
        <>
          {localStorage.getItem("token") && location.pathname != "/pending" ? (
            <NavigationBar currentPage={location.pathname} />
          ) : (
            ""
          )}

          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/forgot-password/:token"
              element={<ForgotPassword />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:routeFilter"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pending"
              element={
                user.token && user.status == "IN_ASTEPTARE" ? (
                  <Pending />
                ) : (
                  redirectTo("/")
                )
              }
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
              path="/user/:id"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:id/:filter"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile-settings"
              element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/referral"
              element={
                <ProtectedRoute>
                  <Referral />
                </ProtectedRoute>
              }
            />
            <Route path="/invite/:id" element={<Invite />} />
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
      ) : (
        <>
          <Backdrop
            open={loader}
            sx={{
              color: "#3b5998",
              zIndex: (theme) => theme.zIndex.drawer + 999,
            }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </div>
  );
}

export default App;
