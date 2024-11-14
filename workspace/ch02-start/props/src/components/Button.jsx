import "./Button.css";

// 💥children prop은 정해져 있는 prop name이다!
export default function Button({
  children,
  type = "button",
  onClick: clickHandler,
  color,
}) {
  return (
    <button
      className="rounded-button"
      type={type}
      onClick={clickHandler}
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
}
