import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./index.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import { useSelector } from "react-redux";
import NewApplicationPage from "./pages/NewApplicationPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import MessagesPage from "./pages/MessagesPage";

const ProtectedLayout = () => {
  const { userInfo } = useSelector((state) => state.user);
  if (userInfo?.token?.access) {
    return <Outlet />;
  }
  return <Navigate to='/login' />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/about-us' element={<AboutPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route
            path='/profile/applications/new'
            element={<NewApplicationPage />}
          />
          <Route
            path='/profile/applications/:id'
            element={<ApplicationsPage />}
          />
          <Route
            path='/profile/messages/:id'
            element={<MessagesPage/>}
          />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
