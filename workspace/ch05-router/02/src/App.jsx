// import Page1 from "./Page1";
// import Home from "./Home";
// import Page2 from "./Page2";
// import { useEffect, useState } from "react";
import router from "./routes";

// Router 제공자
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
