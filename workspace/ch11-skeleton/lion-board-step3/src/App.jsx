import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import useThemeStore from "@zustand/themeStore";
import { HelmetProvider } from "react-helmet-async";

// routes.jsx에서 설정한 라우팅 규칙을 RouterProvider가 인식하고, 적용시킴
// / : <Layout /> 페이지 출력 - Children은 <Outlet/>자리에 출력
function App() {
  const { isDarkMode } = useThemeStore();
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <HelmetProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </HelmetProvider>
  );
}

export default App;
