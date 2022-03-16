import "./SignUpStyles.scss";
import LeftImage from "../../components/LeftImage/LeftImage";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

const SignUp = () => {
  return (
    <div className="signup">
      <LeftImage />
      <div className=""></div>
      <div className="signup__form">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
