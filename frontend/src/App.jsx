import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import RegisterPage from "./pages/RegisterPage";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/about-us' element={<AboutPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
