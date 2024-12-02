import { Button } from "@components/StyledButton";
import "./App.css";
import Login from "./Login";

function App() {
  return (
    <>
      <h1>01 - CSS 파일 임포트</h1>

      <div className="container">
        <Button>그냥 버튼</Button>
        <Button bg="blue" color="red">
          파란 배경의 빨간 글자
        </Button>
        <Button bg="yellow" color="red">
          노란 배경의 빨간 글자
        </Button>
        <Button bg="gray" color="blue">
          회색 배경의 파란 글자
        </Button>
      </div>

      <Login />
      {/* 아무리 App.css에 container, color-blue-red와 같은 클래스에 스타일링을 지정해도, Login.css에 의해 덮여씌여지기 때문에 적용되지 않는다. */}
    </>
  );
}

export default App;
