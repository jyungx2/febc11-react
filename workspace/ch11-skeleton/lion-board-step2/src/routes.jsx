import Layout from "@components/layout";
import Detail from "@pages/board/Detail";
import Edit from "@pages/board/Edit";
import List from "@pages/board/List";
import New from "@pages/board/New";
import MainPage from "@pages/index";
import Login from "@pages/user/Login";
import Signup from "@pages/user/Signup";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <MainPage /> },
        { path: ":type", element: <List /> },
        { path: ":type/new", element: <New /> },
        { path: ":type/:_id", element: <Detail /> },
        { path: ":type/:_id/edit", element: <Edit /> },
        { path: "users/signup", element: <Signup /> },
        { path: "users/login", element: <Login /> },
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
