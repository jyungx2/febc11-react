import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

// const dummyData = {
//   item: {
//     _id: 5,
//     title: "Javascript 공부",
//     content: "열심히 하자",
//     done: false,
//     createdAt: "2024.11.21 16:49:00",
//     updatedAt: "2024.11.21 16:49:00",
//   },
// };

function TodoDetail() {
  // ⭐️ URL의 파라미터 추출
  // 라우터에 path: 'list/:_id'로 등록된 컴포넌트가 호출되는 경우
  // URL이 list/3일 때 useParams()는 {_id: 3}을 반환
  const { _id } = useParams();
  console.log(_id);
  console.log(useParams()); // {_id: '563'}

  const axios = useAxiosInstance();
  const { data, isLoading } = useQuery({
    queryKey: ["todolist", _id],
    queryFn: () => axios.get(`todolist/${_id}`),
    select: (res) => res.data, // res 통째로 꺼내쓸 경우엔 굳이 안 써도 되는 코드.
    staleTime: 1000 * 6,
  });

  // ⛱️ params설정 후, 리스트 하나 클릭하고 나서 목록버튼 눌렀을 때 리셋되는게 아니라, params 그대로 유지된 상태의 페이지로 이동하도록
  const navigate = useNavigate();

  // const [data, setData] = useState(); // 🌼

  // 🌼
  // // API 서버에서 상세정보를 조회
  // const fetchDetail = async () => {
  //   const res = await axios.get(`/todolist/${_id}`);
  //   setData(res.data); // 🌼
  // };

  // 🌼
  // useEffect(() => {
  //   fetchDetail();
  // }, []);

  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
      {isLoading && <div>로딩중...</div>}
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
            {/* ⛱️ -1로 써주어 이전 페이지로 돌아가게끔 */}
            <button type="button" onClick={() => navigate(-1)}>
              목록
            </button>
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
