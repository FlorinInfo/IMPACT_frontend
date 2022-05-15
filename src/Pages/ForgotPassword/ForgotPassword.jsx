import "./ForgotPasswordStyles.scss";
import FPasswordForm from "../../components/FPasswordForm/FPasswordForm";
import LeftImage from "../../components/LeftImage/LeftImage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ForgotPassword = () => { 
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {localStorage.getItem("token") ? (
        ""
      ) : (
        <div className="forgot-password">
          <div className="forgot-password__left">
            <LeftImage />
          </div>
          <div className="forgot-password__form">
            <FPasswordForm />
            <span className="forgot-password__signup-redirect">
               <Link to="/login">Logheaza-te</Link>{" "}
            </span>
          </div>
        </div>
      )}
    </>
  );  
};

export default ForgotPassword;
