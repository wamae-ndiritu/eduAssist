import { NavLink } from "react-router-dom";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center border bg-emerald-300 p-4'>
      <div className='w-full md:w-auto flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <CastForEducationIcon />
          <h1 className='text-white text-2xl font-bold'>EduAssist</h1>
        </div>
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
        <li>
          <NavLink to='/#how-it-works'>How It works</NavLink>
        </li>
        <li>Get Started</li>
        <li>
          <NavLink to='/#about-us'>About Us</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>Profile</NavLink>
        </li>
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
      </ul>
    </div>
  );
};

export default Navbar;
