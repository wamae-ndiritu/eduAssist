import { NavLink } from "react-router-dom";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

const Navbar = () => {
  return (
    <div className="h-18 border bg-emerald-300 p-4 flex justify-between">
      <div className="gap-3 flex items-center">
        <CastForEducationIcon />
        <h1 className="text-white text-2xl font-bold">EduAssist</h1>
      </div>
      <div className="">
        <ul className="flex items-center list-none gap-3">
          <li className="">
            <NavLink to="/#how-it-works">How It works</NavLink>
          </li>
          <li>Get Started</li>
          <li className="">
            <NavLink to="/#about-us">About Us</NavLink>
          </li>
          <li className="">
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/register">
              <button className="bg-white py-1 px-4 rounded text-emerald-500">
                Sign Up
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              <button className="bg-black py-1 px-4 rounded text-white">
                Sign In
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
