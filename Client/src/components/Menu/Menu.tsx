import style from "./Menu.module.css";

const Menu = () => {
  const tools: string[] = [
    "File",
    "Edit",
    "View",
    "Insert",
    "Format",
    "Table",
    "Tools",
  ];
  return (
    <div>
      <ul className={style.menu}>
        {tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
