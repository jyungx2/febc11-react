function Header() {
  const handleClick = (e) => {
    // 브라우저의 기본동작 제거 (a 태그 동작)
    e.preventDefault();
    // (state, title, url)
    // pathname: /home.html (도메인을 제외한 나머지 부분)
    window.history.pushState(null, "", e.target.pathname);
  };

  return (
    <>
      <header>
        <h1>리액트 라우터</h1>
        <a href="home.html" onClick={handleClick}>
          home
        </a>
        <br />
        <a href="page1.html" onClick={handleClick}>
          page1
        </a>
        <br />
        <a href="page2.html" onClick={handleClick}>
          page2
        </a>
      </header>
    </>
  );
}

export default Header;
