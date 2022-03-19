import "./SignUpStyles.scss";
import LeftImage from "../../components/LeftImage/LeftImage";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Link } from "react-router-dom";

const SignUp = () => {

  return (
    <div className="signup">
      <div className="signup__left">
        <LeftImage />
      </div>
      <div className=""></div>
      <div className="signup__form">
        <SignUpForm />
        <span className="signup__login-redirect">Ai deja cont? <Link to="/login">Logheaza-te</Link> </span>
      </div>
    </div>
  );
};

export default SignUp;
