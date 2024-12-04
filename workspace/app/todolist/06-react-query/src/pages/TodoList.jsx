import TodoListItem from "@pages/TodoListItem";
// import { useEffect, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useEffect, useRef, useState } from "react";
import "../Pagination.css";
import Pagination from "@pages/Pagination";
import { useQuery } from "@tanstack/react-query";

function TodoList() {
  // ⛱️ useRef를 이용하여 검색창 구현
  const searchRef = useRef("");

  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    keyword: searchParams.get("keyword") || "", // 환승 (검색어 꺼내오기)
    page: searchParams.get("page") || 1, // 페이지
    limit: 5, // 설정 안하면 10이 디폴트값
  };

  const axios = useAxiosInstance();

  // const [data, setData] = useState(); // 🌺
  // //  ⛱️ 인자값에 의해서만 결과가 좌우되도록(함수의 독립성 keep) 매개변수를 설정
  // const fetchList = async (params = {}) => {
  //   const res = await axios.get(`/todolist`, { params });
  //   setData(res.data);
  // };

  // 🌺 마운트 시에, 데이터 가져와서 보여주긴 해야하니까 빈배열로
  // useEffect(() => {
  //   // ⚠️ fetchList()안에 매개변수를 쓰면 경고창이 뜸! ⚠️
  //   fetchList(params);
  // }, [searchParams]);

  const { data, refetch } = useQuery({
    // useQuery의 queryKey가 변경되는 순간, queryFn이 실행됨
    // => queryKey = useEffect의 두번째 파라미터와 동일한 포지션..
    queryKey: ["할일 목록을 조회하는 쿼리", params],
    queryFn: () => axios.get("/todolist", { params }),
    select: (res) => res.data,
    staleTime: 1000 * 60, // 캐시된지 fresh -> stale 상태로 전환되는데 걸리는 시간, 60초 = 1분동안 기존 캐시를 쓰고, 1분 뒤에는 stale되므로 새롭게 받아서 쓰겠다는 말. (기본값: 0 으로, 캐시 안함..) fresh됐따면 데이터 바꿀 필요 없지만, Stale됐다면, 일단 이전에 캐시된 데이터를 보여주고, 1-2초 뒤에 fresh된 데이터를 업데이트(리렌더링).
    gcTime: 1000 * 60 * 5, // 캐시된 데이터가 얼마동안 사용되지 않으면 제거할지 지정(디폴트 5분)
    refetchOnMount: "always", // fresh 상태여도 요청받아서 새롭게 업데이트된 내용을 가져오겠다(실제로 업데이트되지 않아도)
  });

  // 삭제 작업
  const handleDelete = async (_id) => {
    try {
      // TODO: API서버에 삭제 요청
      await axios.delete(`/todolist/${_id}`);
      alert("할일이 삭제 되었습니다.");

      // TODO: 목록을 다시 조회 🌺
      refetch();
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
            // 비제어 컴포넌트로 만들고, useRef훅 사용한 이유:
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
