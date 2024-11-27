import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SimpleContext } from "@context/SimpleContext.jsx";

createRoot(document.getElementById("root")).render(
  // ✨ App을 감싸게 되면 우리 앱의 모든 컴포넌트에서 사용가능.
  // -> 하지만 최소한의 영역을 감싸는게 좋은 방향.
  // <CounterProvider>
  //
  // <SimpleContext.Provider value={{ hello: "world" }}>
  <App />
  // </SimpleContext.Provider>

  // </CounterProvider>
);
