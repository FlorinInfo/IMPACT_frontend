import "./LoginStyles.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import LeftImage from "../../components/LeftImage/LeftImage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
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
        <div className="login">
          <div className="login__left">
            <LeftImage />
          </div>
          <div className="login__form">
            <LoginForm />
            <span className="login__signup-redirect">
              Nu ai inca cont? <Link to="/signup">Inregistreaza-te</Link>{" "}
            </span>
            {/* <span className="login__signup-redirect">
              Ai uitat parola? <Link to="/signup">Reseteaza parola</Link>{" "}
            </span> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
