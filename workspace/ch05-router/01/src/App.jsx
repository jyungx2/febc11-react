import Page1 from "./Page1";
import Home from "./Home";
import Page2 from "./Page2";
import { useEffect, useState } from "react";

// 라우터 구현 (동작원리 설명 .. 실제로 쓰진 않을 거다!! 이미 누군가에 의해 만들어져 있는 Link 컴포넌트를 쓸 것..)
function App() {
  const [path, setPath] = useState(window.location.pathname);
  console.log("현재 페이지", path);

  // 마운트 될 때 최초 한번만 호출.
  useEffect(() => {
    const handleNavigate = (e) => {
      setPath(e.destination.url.split(location.host).pop());
    };
    // setup: 주소가 변경될 때(= navigate?) 내비게이션 객체 내에 있는 handleNavigate함수를 호출해라
    window.navigation.addEventListener("navigate", handleNavigate);
    // cleanup: 이벤트 제거하는 코드 만들어줘야 함.
    return () => {
      window.navigation.removeEventListener("navigate", handleNavigate);
    };
  }, []);

  // 위에서 Navigate 이벤트를 이용해 페이지 리렌더링
  return (
    <>
      {(path === "/" || path === "/home.html") && <Home />}
      {path === "/page1.html" && <Page1 />}
      {path === "/page2.html" && <Page2 />}
    </>
  );
}

export default App;
