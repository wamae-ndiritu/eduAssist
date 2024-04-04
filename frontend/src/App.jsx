import { useState } from "react";
import "./index.css";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* // <LoginPage /> */}
      <RegisterPage />
    </div>
  );
}

export default App;
