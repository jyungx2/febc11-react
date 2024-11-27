import TodoListItem from "@pages/TodoListItem";
// import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useEffect, useState } from "react";

// 가짜 데이터로 화면 렌더링 테스트(API 서버가 완성될 때까지 기다리지 않고 테스트해보자)
// const dummyData = {
//   // 서버에서 items라는 속성에 맞춰서 데이터를 보내줄 거니까 ..
//   items: [
//     { _id: 1, title: "잠자기" },
//     { _id: 2, title: "자바스크립트 예습" },
//   ],
// };

function TodoList() {
  const searchRef = useRef("");
  // const { item } = useOutletContext();
  // const navigate = useNavigate();
  const [data, setData] = useState(); // 🌺
  // useEffect(() => {
  //   setData(dummyData);
  // }, []); // 마운트 된 이후에만 호출 ('.'서버로부터 데이터 받아올 것)

  // ✅ API 서버에서 목록 조회 (서버연동 매우 쉬움! ...그 데이터를 어떻게 받아서 쓸지 구현하는게 더 어렵)
  // 💥중괄호 안에 못쓴다! 컴포넌트의 최상위 루트에서 써야 한다. 리액트는 훅을 배열로 저장하는데, 이게 조건문 안에 들어가면 특정 상황에서 제 위치(인덱스)가 뒤죽박죽되어 실행이 안될수도 있기 때문
  // const { data } = useFetch({ url: "/todolist" }); // 🌺

  // 👉이것을 해결하기 위해 기존의 useFetch훅 대신 useAxiosInstance()를 만들어서 사용한 루트에서 사용한 것(axios.create) -> 콜백함수 내부에서 부르지 않아 OK.

  // 🌺 useFetch()의 제약사항: 호출하는 순간 뭔가 요청을 보내기 때문에 결과를 만들어버림 => 배열에 저장되기 때문에 후에 특정상황에서 누락될 수 있는 가능성 존재... 즉, 훅 사용시점과 api호출시점이 동일해서 문제가 있음 => 인스턴스(바로 호출,사용하는 것은 아님, 그래서 가능)만 반환하구, 그 반환된 값이 들어있는 변수를 이용해 하나의 함수를 만들어서(fetchList) 그 함수를 useEffect안에서 불러온다.
  // 🖍️ useFetch()대신, axios instance 가져오기
  const axios = useAxiosInstance(); // 🌺 useFetch()에서 data(state) 가져오지 않고, useState()를 이용해 자체적으로 상태 관리!(훅의 도움 안받음 - useRef)

  // 🖍️ 마운트 직후의 삭제 후에 목록 조회를 해야 하므로 함수 만듦
  const fetchList = async () => {
    const res = await axios.get(`/todolist`);
    setData(res.data);
  };

  // 🌺 마운트 시에, 데이터 가져와서 보여주긴 해야하니까 빈배열로
  useEffect(() => {
    // ⚠️ fetchList()안에 매개변수를 쓰면 경고창이 뜸! ⚠️
    fetchList();
  }, []);

  // 삭제 작업
  const handleDelete = async (_id) => {
    try {
      // TODO: API서버에 삭제 요청
      await axios.delete(`/todolist/${_id}`);
      alert("할일이 삭제 되었습니다.");

      // TODO: 목록을 다시 조회 🌺
      fetchList();
    } catch (err) {
      console.error(err);
      alert("할일 삭제에 실패하였습니다.");
    }
  };

  // 최초에는 비어있다가, useEffect에 의해 data = dummyData로 채워짐.
  const itemList = data?.items.map((item) => (
    <TodoListItem key={item._id} item={item} handleDelete={handleDelete} />
  ));

  const handleSearch = () => {};

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
        <form className="search" onSubmit={handleSearch}>
          {/* useState vsd useRef */}
          <input type="text" autoFocus defaultValue={"hello"} />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">{itemList}</ul>
      </div>
      <Outlet />
    </div>
  );
}

export default TodoList;
