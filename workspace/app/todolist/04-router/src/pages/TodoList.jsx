import { Link } from "react-router-dom";

function TodoList() {
  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        {/* 절대경로 -> 복잡하지 않은 사이트기 때문에 요거 채택 
        cf) aaa/bbb/ccc/... 복잡해지면 이렇게 붙여줘야 함 */}
        {/* 라우터에서 path: list/add라고 해주면, -> 아래 to prop을 add라고 상대경로(TodoDetail - ./edit)로 해줘도 Ok but 복잡하지 않으면 절대경로로 해주자. */}
        <Link to="/list/add">추가</Link>
        {/* 상대경로 */}
        {/* <Link to="add">추가</Link>
        <Link to="./add">추가</Link> */}
        <br />
        <form className="search">
          <input type="text" autoFocus />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">
          <li>
            <span>1</span>
            <Link to="/list/1">잠자기</Link>
            <Link to="/list">삭제</Link>
          </li>
          <li>
            <span>2</span>
            <Link to="/list/2">자바스크립트 복습</Link>
            <Link to="/list">삭제</Link>
          </li>
          <li>
            <span>3</span>
            <Link to="/list/3">
              <s>리액트 과제 하기</s>
            </Link>
            <Link to="/list">삭제</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
