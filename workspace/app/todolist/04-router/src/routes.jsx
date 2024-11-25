import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import About from "@pages/About";
import TodoEdit from "@pages/TodoEdit";
import TodoAdd from "@pages/TodoAdd";
import TodoDetail from "@pages/TodoDetail";
import TodoList from "@pages/TodoList";

const router = createBrowserRouter([
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
    ],
  },
]);

export default router;
