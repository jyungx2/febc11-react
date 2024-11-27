import TodoListItem from "@pages/TodoListItem";
// import { useEffect, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useEffect, useRef, useState } from "react";
import "../Pagination.css";
import Pagination from "@pages/Pagination";

// 가짜 데이터로 화면 렌더링 테스트(API 서버가 완성될 때까지 기다리지 않고 테스트해보자)
// const dummyData = {
//   // 서버에서 items라는 속성에 맞춰서 데이터를 보내줄 거니까 ..
//   items: [
//     { _id: 1, title: "잠자기" },
//     { _id: 2, title: "자바스크립트 예습" },
//   ],
// };

function TodoList() {
  // ⛱️ useRef를 이용하여 검색창 구현
  const searchRef = useRef("");

  // 쿼리 스트링 정보를 읽거나 설정
  // /list?keyword=환승&page=3 => new URLSearchParams('keyword=환승&page=3')
  // 1. 꺼내는 작업할 때의 useSearchParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    // 🚧 검색어 쳐서 검색한 뒤, 다시 TodoList 눌렀을 때, 검색어가 없어지고 Emptry string으로 나오도록 설정해야 함 rf) 여기서 (|| "") 라고 설정해도 안됨..
    keyword: searchParams.get("keyword"), // 환승 (검색어 꺼내오기)
    page: searchParams.get("page") || 1, // 페이지
    limit: 5, // 설정 안하면 10이 디폴트값
  };
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
  //  ⛱️ 인자값에 의해서만 결과가 좌우되도록(함수의 독립성 keep) 매개변수를 설정
  const fetchList = async (params = {}) => {
    const res = await axios.get(`/todolist`, { params }); // ⛱️ 두번째는 옵션을 전달 - params: ? 찍고 뒤에 보내는 값 (todolist바로 뒤에 하드코드할 수도 있지만, 여러개의 파라미터가 있을 수도 있끼 때문에 객체로 보낼것임 - keyword(검색어)가 넘어감)
    setData(res.data);
  };

  // 🌺 마운트 시에, 데이터 가져와서 보여주긴 해야하니까 빈배열로
  useEffect(() => {
    // ⚠️ fetchList()안에 매개변수를 쓰면 경고창이 뜸! ⚠️
    fetchList(params);
  }, [searchParams]); // ⛱️ 주소창은 검색어에 따라 ?keyword=''이 붙으면서 잘 바뀌는데, 목록창이 안 바뀜!! => []로 해놨기 때문에 마운트(최초 렌더링) 됐을 때만 호출되기 때문, 따라서 검색어가 바뀔 때마다(searchParams) 호출되도록 디펜던시 설정

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

  // ⛱️
  const handleSearch = (e) => {
    e.preventDefault();
    // current 속성을 거쳐서 !!
    const inputKeyword = searchRef.current.value;
    console.log(inputKeyword);

    // 2. 유저가 입력한 값을 키워드값으로 설정하는 작업: URLSearchParams()
    const newSearchParams = new URLSearchParams(`keyword=${inputKeyword}`);
    setSearchParams(newSearchParams);
  };

  // let pageList = [];
  // const current = data?.pagination.page;

  // // pagination 속성은 항상 있기 때문에 굳이 ? 안붙여도 OK
  // // 💥💥data는 붙여라!!💥💥
  // for (let page = 1; page <= data?.pagination.totalPages; page++) {
  //   searchParams.set("page", page); // page속성을 1.2.3..으로 설정
  //   let search = searchParams.toString(); // toString: /list?🪝keyword=환승&page=1/2/3🪝 여기서 ?뒤의 문자열을 꺼내옴 (이때, 키워드까지 다같이 뽑아오는 것!)

  //   pageList.push(
  //     <li key={page} className={current === page ? "active" : ""}>
  //       <Link to={`/list?${search}`}>{page}</Link>
  //     </li>
  //   );
  // }

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
          <input
            type="text"
            autoFocus
            defaultValue={params.keyword}
            ref={searchRef}
          />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">{itemList}</ul>
      </div>

      {/* <div className="pagination">
        <ul>{pageList}</ul>
      </div> */}

      {/* data있다는 전제하에 Pagination 컴포넌트를 불러와야함 ... 불필요한 렌더링 -> && 이용 */}
      {/* Optional chaining(?): data?.pagination.~이라고 써봤자 해결안됨... ?은 undefined나 null을 만나면 ❌에러❌를 발생시키지 않고, 대신 undefined를 반환 */}
      {data && (
        <Pagination
          totalPages={data.pagination.totalPages}
          current={data.pagination.page}
        />
      )}

      <Outlet />
    </div>
  );
}

export default TodoList;
