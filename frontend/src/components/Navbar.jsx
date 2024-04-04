import {NavLink} from "react-router-dom"

const Navbar = () => {
    return (
      <div className='bg-emerald-300 p-4 flex justify-between'>
        <h1 className='text-white text-2xl font-bold'>EduAssist</h1>
        <div className=''>
          <ul className='flex items-center list-none gap-1'>
            <li>How It works</li>
            <li>Get Started</li>
            <li className='mr-10'>
              <NavLink to='/about-us'>About Us</NavLink>
            </li>
            <li>
              <button className='bg-white py-1 px-4 rounded text-emerald-500'>
                Sign Up
              </button>
            </li>
            <li>
              <button className='bg-black py-1 px-4 rounded text-white'>
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
}

export default Navbar;