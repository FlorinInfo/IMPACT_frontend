import "./LoginStyles.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import LeftImage from "../../components/LeftImage/LeftImage";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="login__left">
        <LeftImage />
      </div>
      <div className="login__form">
        <LoginForm />
        <span className="login__signup-redirect">
          Nu ai inca cont? <Link to="/signup">Inregistreaza-te</Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default Login;
