import PropTypes from "prop-types";
import "./Button.css";

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.oneOf(["blue", "red", "yellow", "white"]), // 글자 색상: 배열 값 중에 하나만 와야 한다. (선택지 설정)
  bg: PropTypes.oneOf(["blue", "red", "yellow", "gray"]),
  onClick: PropTypes.func,
};

// 💥children prop은 정해져 있는 prop name이다!
export default function Button({
  children,
  type = "button",
  bg,
  color,
  onClick: clickHandler,
}) {
  return (
    <button
      className={`button color-${bg}-${color}`}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
