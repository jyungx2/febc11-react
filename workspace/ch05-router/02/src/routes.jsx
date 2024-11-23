import Layout from "./Layout";
import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";
import { createBrowserRouter, Navigate } from "react-router-dom";

// <라우팅 규칙 정의하는 파일>
// 브라우저의 히스토리를 기반으로 라우팅해주는 애
// 마치 우리가 <a>태그 가지고 왔다갔다 이동하는 것처럼 동작하는 애

// 라우팅할 페이지만큼 객체를 추가하면 된다! 한 페이지당 하나의 객체
const router = createBrowserRouter(
  [
    // {
    //   path: "/",
    //   element: <Home />, // Home component를 응답해라
    // },
    // {
    //   path: "/page1",
    //   element: <Page1 />, // Page1 component를 응답해라
    // },

    // {
    //   path: "/page2",
    //   element: <Page2 />, // Page2 component를 응답해라
    // },
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/home" /> }, // /users
        { path: "home", element: <Home /> },
        { path: "page1", element: <Page1 /> }, // /users/page1
        { path: "page2", element: <Page2 /> }, // /users/page2
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
