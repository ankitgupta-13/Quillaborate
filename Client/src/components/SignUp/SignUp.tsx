import style from "./SignUp.module.css";
import { useState } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useNavigate } from "react-router-dom";
import eyeOepn from "../../assets/eye-open.svg";
import eyeClose from "../../assets/eye-close.svg";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassowrd) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={style.containerIcon}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? eyeClose : eyeOepn}
            alt="eye"
            className={style.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className={style.containerIcon}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassowrd}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <img
            src={showConfirmPassword ? eyeClose : eyeOepn}
            alt="eye"
            className={style.eyeIcon}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        <ButtonComponent type="submit">Register</ButtonComponent>
      </form>
      <a onClick={() => navigate("/login")}>Already have an account? Login</a>
    </div>
  );
};

export default SignUp;
