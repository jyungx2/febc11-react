import Footer from "@components/layout/\bFooter";
import Header from "@components/layout/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <Header />

      {/* 모든 컴포넌트가 이 아울렛 자리에 들어감 => children 배열안에 있는 페이지들이 경로에 맞게 들어감 .. 기본적으로 메인 홈은 index:tru인 페이지가 해당. */}
      <Outlet />

      <Footer />
    </div>
  );
}
