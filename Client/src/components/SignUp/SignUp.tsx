import style from "./SignUp.module.css";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log("Submitted");
  };
  return (
    <div className={style.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <input type="text" placeholder="Enter youe Full Name" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <ButtonComponent type="submit">Register</ButtonComponent>
      </form>
      <a onClick={() => navigate("/login")}>Already have an account? Login</a>
    </div>
  );
};

export default SignUp;
