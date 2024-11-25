import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Todo List</h1>
      <nav>
        <div>
          <ul>
            <li>
              {/* 라우터 쓸거면 <a>, href가 아닌, Link태그와 to속성을 써라 */}
              <Link to="home">Home</Link>
            </li>
            <li>
              <Link to="about">About</Link>
            </li>
            <li>
              <Link to="list">TodoList</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
