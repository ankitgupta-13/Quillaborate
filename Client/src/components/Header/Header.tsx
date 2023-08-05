import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import account from "../../assets/account.svg";
// import lock from "../../assets/lock.svg";
import Menu from "../Menu/Menu";
import style from "./Header.module.css";
import logo from "../../assets/logo.svg";

const Header = () => {
  let fileName = "Untitled Document";
  return (
    <div className={style.header}>
      <div className={style.left}>
        <img src={logo} alt="Not found!" className={style.logo} />
        <span className={style.title}>{fileName}</span>
      </div>
      <Menu />
      <div className={style.right}>
        <ButtonComponent>Share</ButtonComponent>
        <img src={account} alt="Not found!" className={style.accountImage} />
        <ButtonComponent>Sign in</ButtonComponent>
      </div>
    </div>
  );
};

export default Header;
