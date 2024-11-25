import { Link, Outlet, useParams } from "react-router-dom";

function TodoDetail() {
  const { _id } = useParams();
  console.log(_id);

  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
      <div className="todo">
        <div>제목 : 잠자기</div>
        <div>내용 : 주말에 수업 끝나면 잠이나 실컷 자야지</div>
        <div>상태 : 미완료</div>
        <div>작성일 : 2024.11.25 12:23:45</div>
        <div>수정일 : 2024.11.25 13:45:12</div>
        {/* 2️⃣ 절대경로가 아닌 상대경로로! list/(숫자) = . 이거 뒤에 /edit을 붙여라(만약 유저가 수정 버튼을 누르면) */}
        <Link to="./edit">수정</Link>
        {/* 절대경로 */}
        {/* <Link to=`/list/${id}/edit`>수정</Link> */}
        <Link to="/list">목록</Link>
      </div>

      <Outlet />
    </div>
  );
}

export default TodoDetail;
