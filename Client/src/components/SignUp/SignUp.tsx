import style from "./SignUp.module.css";
import { useState } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassowrd }),
    });
    const data = await response.json();
    console.log(data);
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
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassowrd}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <ButtonComponent type="submit">Register</ButtonComponent>
      </form>
      <a onClick={() => navigate("/login")}>Already have an account? Login</a>
    </div>
  );
};

export default SignUp;
