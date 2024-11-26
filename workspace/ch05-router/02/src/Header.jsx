import { NavLink } from "react-router-dom";

function Header() {
  // const handleClick = (e) => {
  //   // 브라우저의 기본동작 제거 (a 태그 동작)
  //   e.preventDefault();
  //   // (state, title, url)
  //   // pathname: /home.html (도메인을 제외한 나머지 부분)
  //   window.history.pushState(null, "", e.target.pathname);
  // };

  // <a> 태그 무력화 -> Link 컴포넌트로 대체(유저가 새로운 페이지로 이동할 때마다 전체 index.html의 새로고침을 막고, SPA 만들 때 사용하는 라이브러리)
  return (
    <>
      <header>
        <h1>리액트 라우터</h1>

        <NavLink
          className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
          to="/page1"
        >
          page1
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
          to="/page2"
        >
          page2
        </NavLink>

        {/*         
        <Link to="/">home</Link>
        <br />
        <Link to="/page1">page1</Link>
        <br />
        <Link to="/page2">page2</Link> */}
      </header>
    </>
  );
}

export default Header;
