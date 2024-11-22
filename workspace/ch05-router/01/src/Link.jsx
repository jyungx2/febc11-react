import PropTypes from "prop-types";

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
};

function Link({ children, to }) {
  const handleClick = (e) => {
    // 브라우저의 기본동작 제거 (a 태그 동작)
    e.preventDefault();
    // (state, title, url)
    // pathname: /home.html (도메인을 제외한 나머지 부분)
    window.history.pushState(null, "", e.target.pathname);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
