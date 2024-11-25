import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import About from "@pages/About";
import TodoEdit from "@pages/TodoEdit";
import TodoAdd from "@pages/TodoAdd";
import TodoDetail from "@pages/TodoDetail";
import TodoList from "@pages/TodoList";
import ErrorPage from "@pages/ErrorPage";

const router = createBrowserRouter(
  [
    {
      // 로컬호스트/ => <Layout /> 출력
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      // <Layout /> - <Outlet />부분에 칠드런 중 하나 출력
      children: [
        // 로컬호스트(/)까지만 입력하면 아래 Navigate로 지정한 url(to)로 이동해라
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "list", element: <TodoList /> },
        { path: "list/add", element: <TodoAdd /> },
        { path: "edit", element: <TodoEdit /> },
        { path: "detail", element: <TodoDetail /> },
        // 1️⃣ 동적 세그먼트
        // 위의 url은 바뀌지 않는다. 상세페이지는 유저가 무엇을 선택했는지 알려줘야 하므로 고유한 id값을 부여해야 하고 이걸 동적 세그먼트라고 한다.
        // 바뀔 수 있는 부분을 :로 시작하는 원하는 이름으로 붙여주면 된다. (ex. :_id)
        // ✨ ~/list/3 => <TodoDetail/> - 수정 버튼(⭐️to = .edit/⭐️ ...Url이 쭉 이어져야 하므로 상대경로) 누를시,
        // <TodoDetail /> - <Outlet /> 부분에 edit 페이지 출력
        {
          path: "list/:_id",
          // :으로 시작하는 _id라는 변수를 지정하여 해당 element(=TodoDetail)에서 useParams() 훅(객체 리턴)을 이용해 컨솔로 확인 가능
          element: <TodoDetail />,
          children: [{ path: "edit", element: <TodoEdit /> }],
        },
        // 2️⃣ 중첩 라우팅
        // 각각의 아이템(:_id)의 수정 버튼 눌렀을 때, detail(상세보기)와 edit(편집창)이 함께 보이게끔 하고 싶다..
        // 자식 페이지가 나타날 부분에 <Outlet />을 추가
      ],
    },
  ],
  {
    // 없으면 콘솔에 경고 표시
    // 7점대 업데이트되면 필요없는 코드(현재 쓰고 있는 버전은 6점대라..)
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
