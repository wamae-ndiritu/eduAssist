import { Link, NavLink } from "react-router-dom";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import {useSelector, useDispatch} from "react-redux";
import { logout } from "../redux/actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <div className='flex justify-between items-end border bg-emerald-300 p-4'>
      <div className='w-full md:w-auto flex justify-between items-center'>
        <Link to='/' className='flex items-center gap-3'>
          <CastForEducationIcon />
          <h1 className='text-white text-2xl font-bold'>EduAssist</h1>
        </Link>
        <button className='block md:hidden focus:outline-none'>
          {/* Button for mobile menu toggle */}
          <svg
            className='h-6 w-6 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        </button>
      </div>
      <ul className='hidden md:flex md:gap-3 md:items-center md:list-none'>
        {/* Navigation links */}
        {userInfo && (
          <li className='relative cursor-pointer account-link'>
            Account
            <ul className='w-max ac-sub-menu bg-emerald-300 rounded border border-emerald-300 pt-4 px-2 absolute top-5 pt-10'>
              <li className='my-1 px-2 py-1 hover:bg-white hover:rounded'>
                <NavLink to='/profile'>Profile</NavLink>
              </li>
              <li className='my-1 px-2 py-1 hover:bg-white hover:rounded'>
                My Applications
              </li>
              <li className='my-1 px-2 py-1 hover:bg-white hover:rounded'>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </li>
        )}
        <li>
          <NavLink to='/#how-it-works'>How It works</NavLink>
        </li>
        <li>Get Started</li>
        <li>
          <NavLink to='/#about-us'>About Us</NavLink>
        </li>
        {!userInfo && (
          <li className="flex gap-3">
            <li>
              <NavLink to='/register'>
                <button className='bg-white py-1 px-4 rounded text-emerald-500'>
                  Sign Up
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to='/login'>
                <button className='bg-black py-1 px-4 rounded text-white'>
                  Sign In
                </button>
              </NavLink>
            </li>
          </li>
        )}
        <li>
          {userInfo && (
            <h6 className='bg-white capitalize px-2 py-1 rounded text-emerald-500'>
              Hi, {userInfo?.user?.username}
            </h6>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
