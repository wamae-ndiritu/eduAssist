import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
const SideBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className='bg-slate-100 text-black w-48 py-4 border-r'>
      <div className='w-full border-b px-2 flex flex-col items-center'>
        <img
          src='/qwetu.jpeg'
          alt='spms'
          className='w-32 h-14 object-cover rounded'
        />
        <h5 className='my-3 text-xl font-semibold'>eduAssist</h5>
      </div>
      <div className='px-2 py-4'>
        <ul className='list-type-none px-4'>
          <li className='my-1'>
            <NavLink
              to='/my-account'
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 p-2 bg-orange-600 text-white"
                  : "flex gap-3 p-2 hover:bg-orange-600 hover:text-white"
              }
            >
              <DashboardIcon />
              <h6>Dashboard</h6>
            </NavLink>
          </li>
          <li className=''>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 p-2 bg-orange-600 text-white"
                  : "flex gap-3 p-2 hover:bg-orange-600 hover:text-white"
              }
            >
              <AccountCircleIcon />
              <h6>Profile</h6>
            </NavLink>
          </li>
          <li className='my-1'>
            <button
              className='flex gap-3 p-2 cursor-pointer hover:bg-orange-600 hover:text-white'
              onClick={handleLogout}
            >
              <LogoutIcon />
              <h6>Logout</h6>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
