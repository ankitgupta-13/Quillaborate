import style from "./SignIn.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { GoogleLogin } from "@react-oauth/google";
import eyeOpen from "../../assets/eye-open.svg";
import eyeClose from "../../assets/eye-close.svg";
import jwtDecode from "jwt-decode";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const createOrGetUser = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const { email, name, picture, sub } = decoded;
    const user = {
      email,
      username: name,
      avatar: picture,
      googleId: sub,
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/user/googleLogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      if (response.status === 200) {
        const parseRes = await response.json();
        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token);
          localStorage.setItem("avatar", parseRes.user.avatar);
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={style.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className={style.containerIcon}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? eyeClose : eyeOpen}
            alt=""
            className={style.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
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
