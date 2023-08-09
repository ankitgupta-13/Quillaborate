// import { DialogComponent } from "@syncfusion/ej2-react-popups";
import style from "./Menu.module.css";
import { useEffect, useState } from "react";

const Menu = ({
  title,
  submenuItems,
  openSubmenu,
  setOpenSubmenu,
  closeSubmenu,
}) => {
  const isSubmenuOpen = openSubmenu === title;
  const toggleSubmenu = (e) => {

    console.log(title)
    console.log(submenuItems)
    isSubmenuOpen ? closeSubmenu() : setOpenSubmenu(title);
  };

  return (
    <div className={style.menu} onClick={(e)=>toggleSubmenu(e)}>
      {title}
      {isSubmenuOpen && (
        <div className={style.submenu}>
          {Object.entries(submenuItems).map(([key, value]) => {
           return <div key={key} className={style.submenuItem}>
              {value}
            </div>
          })}
        </div>
      )}
    </div>
  );
};

export default Menu;
