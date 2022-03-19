import "./LoginFormStyles.scss";

const LoginForm = () => {
  return (
    <>
      <form action="submit" className="login-form">
        <h3 className="login-form__title">Logheaza-te pe Impact</h3>
        <div className="login-form__h-line"></div>
        <label htmlFor="email" className="label-default">
          Adresa de email
        </label>
        <input type="text" className="input-default" name="email" />
        <span className="error-default"></span>
        <label htmlFor="parola" className="label-default">
          Parola
        </label>
        <input
          type="password"
          className="input-default"
          name="parola"
          placeholder="6+ caractere"
        />
        <span className="error-default"></span>
        <button type="button" className="button-default-form  submit-btn">Logheaza-te</button>
      </form>
    </>
  );
};

export default LoginForm;
