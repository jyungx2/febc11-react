import "./Button.css";
import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string, // button = 초기값으로 설정해놓음
  onClick: PropTypes.func,
  color: PropTypes.string,
};

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
