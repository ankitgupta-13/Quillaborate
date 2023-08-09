import { useState } from "react";
import style from "./ResetPassword.module.css";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className={style.container}>
      <h1>Reset password</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
