// import { DialogComponent } from "@syncfusion/ej2-react-popups";
import style from "./Menu.module.css";
import { useState } from "react";

const Menu = ({
  title,
  submenuItems,
  openSubmenu,
  setOpenSubmenu,
  closeSubmenu,
}) => {
  const isSubmenuOpen = openSubmenu === title;
  const toggleSubmenu = () => {
    isSubmenuOpen ? closeSubmenu() : setOpenSubmenu(title);
  };

  return (
    <div className={style.menu} onClick={toggleSubmenu}>
      {title}
      {openSubmenu && (
        <div className={style.submenu}>
          {Object.entries(submenuItems).map(([key, value]) => (
            <div key={key} className={style.submenuItem}>
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
