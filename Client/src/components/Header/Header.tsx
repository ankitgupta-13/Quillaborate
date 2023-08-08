import { useState } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import account from "../../assets/account.svg";
import Menu from "../Menu/Menu";
import style from "./Header.module.css";
import logo from "../../assets/logo.svg";
import lock from "../../assets/lock.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let fileName = "Untitled Document";
  const navigate = useNavigate();
  const menuItems = {
    File: {
      new: "New",
      open: "Open",
      save: "Save",
      saveAs: "Save As",
      print: "Print",
    },
    Edit: {
      cut: "Cut",
      copy: "Copy",
      paste: "Paste",
      undo: "Undo",
      redo: "Redo",
    },
    View: {
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      resetZoom: "Reset Zoom",
      fullScreen: "Full Screen",
    },
    Insert: {
      image: "Image",
      link: "Link",
      table: "Table",
      header: "Header",
      footer: "Footer",
    },
    Format: {
      bold: "Bold",
      italic: "Italic",
      underline: "Underline",
      strikethrough: "Strikethrough",
      superscript: "Superscript",
      subscript: "Subscript",
    },
    Tools: {
      spellCheck: "Spell Check",
      wordCount: "Word Count",
    },
    Help: {
      about: "About",
    },
  };
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const closeSubmenu = () => {
    setOpenSubmenu(null);
  };
  const handleUser = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("avatar");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={style.header}>
      <div className={style.left}>
        <img src={logo} alt="Not found!" className={style.logo} />
        <span className={style.title}>{fileName}</span>
      </div>
      <div className={style.menu}>
        {Object.entries(menuItems).map(([title, submenuItems]) => (
          <Menu
            key={title}
            title={title}
            submenuItems={submenuItems}
            openSubmenu={openSubmenu}
            setOpenSubmenu={setOpenSubmenu}
            closeSubmenu={closeSubmenu}
          />
        ))}
      </div>
      <div className={style.right}>
        <ButtonComponent className={style.shareButton}>
          <img src={lock} alt="" className={style.lock} />
          Share
        </ButtonComponent>
        <img
          src={
            localStorage.getItem("avatar")
              ? window.localStorage.getItem("avatar").toString()
              : account
          }
          alt="Not found!"
          className={style.accountImage}
        />
        <ButtonComponent onClick={handleUser}>
          {localStorage.getItem("token") ? "Logout" : "Login"}
        </ButtonComponent>
      </div>
    </div>
  );
};

export default Header;
