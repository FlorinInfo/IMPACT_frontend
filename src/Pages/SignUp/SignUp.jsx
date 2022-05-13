import "./SignUpStyles.scss";
import LeftImage from "../../components/LeftImage/LeftImage";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUp = () => {
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
        <div className="signup">
          <div className="signup__left">
            <LeftImage />
          </div>
          <div className=""></div>
          <div className="signup__form">
            <SignUpForm />
            <span className="signup__login-redirect">
              Ai deja cont? <Link to="/login">Logheaza-te</Link>{" "}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
