import { Button, Submit } from "@components/StyledButton";
import "./Login.css";

// 이 파일은 Button.jsx + Button.css
function Login() {
  return (
    <div className="container">
      <h2>Login</h2>
      <form className="form">
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="input color-red-blue"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="input color-blue-red"
            required
          />
        </div>
        {/*  최신 styled-components와 React 환경에서는 $ 접두어를 사용하는 방식이 더 안전하고 권장됨 */}
        <Button bg="gray" color="blue" size="12px">
          회원가입
        </Button>
        <Button bg="yellow" color="red" size="12px">
          카카오 로그인
        </Button>
        <Submit size="12px">로그인</Submit>
      </form>
    </div>
  );
}

export default Login;
