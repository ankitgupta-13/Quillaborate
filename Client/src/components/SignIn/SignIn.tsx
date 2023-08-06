import style from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {};
  return (
    <div className={style.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <ButtonComponent type="submit">Login</ButtonComponent>
      </form>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          createOrGetUser(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />

      <a onClick={() => navigate("/forgotPassword")}>Forgot Password</a>
      <a onClick={() => navigate("/register")}>
        Don't have an account? Create Account
      </a>
    </div>
  );
};

export default SignIn;
