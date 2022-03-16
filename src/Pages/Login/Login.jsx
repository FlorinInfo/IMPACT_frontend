import "./LoginStyles.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import LeftImage from "../../components/LeftImage/LeftImage";

const Login = () => {
  return (
    <div className="login">
      <LeftImage />
      <div className="login__form">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
