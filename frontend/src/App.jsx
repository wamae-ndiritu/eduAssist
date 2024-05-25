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
import FinancialAidRequests from "./components/donorsComponents/FinancialAidRequests";
import DashboardLayout from "./components/donorsComponents/DashboardLayout";
import FinancialRequestDetails from "./components/donorsComponents/FinancialRequestDetails";
import UserReviews from "./components/donorsComponents/UserReviews";
import DonorProfile from "./components/donorsComponents/DonorProfile";
import DonorsPage from "./components/donorsComponents/DonorsPage";
import StudentsPage from "./components/donorsComponents/StudentsPage";
import ApplicationDetails from "./pages/ApplicationDetails";

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
          <Route path='/profile/applications' element={<ApplicationsPage />} />
          <Route path='/profile/applications/:id' element={<ApplicationDetails />} />
          <Route path='/profile/messages/:id' element={<MessagesPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<FinancialAidRequests />} />
          <Route path='/dashboard/reviews' element={<UserReviews />} />
          <Route path='/dashboard/profile' element={<DonorProfile />} />
          <Route path='/dashboard/donors' element={<DonorsPage />} />
          <Route path='/dashboard/students' element={<StudentsPage />} />
          <Route
            path='/financial-requests/:id'
            element={<FinancialRequestDetails />}
          />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
