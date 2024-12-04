import { RouterProvider } from "react-router-dom";
// import router from "./routes";
// Lazy-loading: lazy() 함수를 이용해 동적으로 임포트하는 방식
// -> Js파일을 통째로 묶지 않고, 페이지 별로 쪼개서 해당 페이지에 최초로 들어갈 때마다 다운로드 받아 유저에게 보여주는 방식
// -> 초기 다운로드는 빠르지만, 페이지 전환 속도가 느릴 수 있다.
import router from "./routes-lazy";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Suspense>
  );
}

export default App;
