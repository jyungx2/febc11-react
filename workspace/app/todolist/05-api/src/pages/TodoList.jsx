import TodoListItem from "@pages/TodoListItem";
// import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
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
  // const { item } = useOutletContext();
  // const navigate = useNavigate();
  const [data, setData] = useState(); // 🌺
  // useEffect(() => {
  //   setData(dummyData);
  // }, []); // 마운트 된 이후에만 호출 ('.'서버로부터 데이터 받아올 것)

  // API 서버에서 목록 조회 (서버연동 매우 쉬움! ...그 데이터를 어떻게 받아서 쓸지 구현하는게 더 어렵)
  // const { data } = useFetch({ url: "/todolist" });

  // 🌺 아이템의 삭제버튼 눌렀을 때 새로고침없이 바로 반영되도록
  const axios = useAxiosInstance();
  const fetchList = async () => {
    const res = await axios.get(`/todolist`);
    setData(res.data);
  };

  // 🌺 마운트 시에, 데이터 가져와서 보여주긴 해야하니까 빈배열로
  useEffect(() => {
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
        <ul className="todolist">{itemList}</ul>
      </div>
      <Outlet />
    </div>
  );
}

export default TodoList;