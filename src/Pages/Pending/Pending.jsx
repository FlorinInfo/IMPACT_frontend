import "./PendingStyles.scss";
import Lottie from "react-lottie";
import pendingAnimation from "../../assets/lotties/pending.json";

const Pending = () => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: pendingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="pending">
      <Lottie options={lottieOptions} height={400} width={400} />
      <h4 className="pending__title">Cererea ta se proceseaza.</h4>
      <h5 className="pending__subtitle">Vei primi un email atunci cand este finalizata.</h5>
    </div>
  );
};

export default Pending;
