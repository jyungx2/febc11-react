import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import About from "@pages/About";
import TodoEdit from "@pages/TodoEdit";
import TodoAdd from "@pages/TodoAdd";
import TodoDetail from "@pages/TodoDetail";
import TodoList from "@pages/TodoList";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        // 로컬호스트(/)까지만 입력하면 아래 Navigate로 지정한 url(to)로 이동해라
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "list", element: <TodoList /> },
        { path: "add", element: <TodoAdd /> },
        { path: "edit", element: <TodoEdit /> },
        { path: "detail", element: <TodoDetail /> },
        // 위의 url은 바뀌지 않는다. 상세페이지는 유저가 무엇을 선택했는지 알려줘야 하므로 고유한 id값을 부여해야 하고 이걸 동적 세그먼트라고 한다.
        // 바뀔 수 있는 부분을 :로 시작하는 원하는 이름으로 붙여주면 된다.
        { path: "list/:_id", element: <TodoDetail /> },
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
