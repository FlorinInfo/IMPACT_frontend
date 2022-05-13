import "./PendingStyles.scss";
import Lottie from "react-lottie";
import pendingAnimation from "../../assets/lotties/pending.json";
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import axios from "../../assets/axios/axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Pending = () => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: pendingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  // useEffect(() => {
  //   setLoader(true);
  //   const userId = jwt_decode(cookies.token).userId;
  //   console.log(userId)
  //   axios
  //     .get(
  //       `/users/${userId}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${cookies.token}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       // handle success
  //       console.log(response);
  //       if (response.data.status != "IN_ASTEPTARE") navigate(-1);
  //       setLoader(false);
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     })
  //     .then(() => {
  //       // always executed
  //     });
  // }, [])

  const logOut = () => {
    removeCookie("token");
    removeCookie("zoneRole");
    removeCookie("zoneRoleOn");
    removeCookie("countyId");
    removeCookie("villageId");
    removeCookie("localityId");
    removeCookie("admin");
    // setUser({});
    navigate("/login")
    return;
  };

  return (
    <div className="pending">
      <Lottie options={lottieOptions} height={400} width={400} />
      <h4 className="pending__title">Cererea ta se proceseaza.</h4>
      <h5 className="pending__subtitle">
        Vei primi un email atunci cand este finalizata.
      </h5>
      <button className="pending__logout" onClick={logOut}>
        Log out
      </button>
    </div>
  );
};

export default Pending;
