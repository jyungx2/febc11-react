import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

const dummyData = {
  item: {
    _id: 5,
    title: "Javascript 공부",
    content: "열심히 하자",
    done: false,
    createdAt: "2024.11.21 16:49:00",
    updatedAt: "2024.11.21 16:49:00",
  },
};

function TodoDetail() {
  // ⭐️ URL의 파라미터 추출
  // 라우터에 path: 'list/:_id'로 등록된 컴포넌트가 호출되는 경우
  // URL이 list/3일 때 useParams()는 {_id: 3}을 반환
  const { _id } = useParams();
  console.log(_id);

  const [data, setData] = useState();

  useEffect(() => {
    // TODO: API 서버 통신
    // 외부에서 데이터를 받아오는 작업은 함수의 순수성을 잃게 만들어 사이드 이펙트 발생 -> useEffect 안에서 활용 -> '데이타가 있을 경우에만 다음 todo 디브를 보여줘라'(data && ~)기 때문에 todo의 리턴값은 null => 순수함수로 보존o -> useEffect()에서 받아온 데이터는 이미 리턴하고 나서 화면을 렌더링하는 것.
    setData(dummyData);
  }, []);

  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
      {data && (
        <>
          <div className="todo">
            <div>제목 : {data.item.title}</div>
            <div>내용 : {data.item.content}</div>
            <div>상태 : {data.item.done ? "완료" : "미완료"}</div>
            <div>작성일 : {data.item.createdAt}</div>
            <div>수정일 : {data.item.updatedAt}</div>
            {/* 2️⃣ 절대경로가 아닌 상대경로로! list/(숫자) = . 이거 뒤에 /edit을 붙여라(만약 유저가 수정 버튼을 누르면) */}
            <Link to="./edit">수정</Link>
            {/* 절대경로 */}
            {/* <Link to=`/list/${id}/edit`>수정</Link> */}
            <Link to="/list">목록</Link>
          </div>

          {/* 리액트 라우터에서 정의된 부모-자식간의 데이터를 전송하기 위해 쓰는 속성 => context */}
          {/* ❓❓❓❓❓❓이거 왜 <>안에 넣어야하는지..item이 왜 언디파인드될수있는지..이방법 아니면 왜 위에서 item?이라고 써줘도 해결되는지.. */}
          <Outlet context={{ item: data.item }} />
        </>
      )}
    </div>
  );
}

export default TodoDetail;
