import "./SignUpStyles.scss";
import LeftImage from "../../components/LeftImage/LeftImage";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      navigate(-1);
    }
  }, []);

  return (
    <>
      {cookies.token ? (
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
