import { RouterProvider } from "react-router-dom";
import router from "@/routes";

// routes.jsx에서 설정한 라우팅 규칙을 RouterProvider가 인식하고, 적용시킴
// / : <Layout /> 페이지 출력 - Children은 <Outlet/>자리에 출력
function App() {
  return <RouterProvider router={router} />;
}

export default App;
