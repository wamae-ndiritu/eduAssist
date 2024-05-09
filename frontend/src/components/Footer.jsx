import { NavLink } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

const Footer = () => {
  return (
    <div className='bg-emerald-300 p-6 grid grid-cols-1 md:grid-cols-3 gap-3'>
      <div className='col-span-1 flex gap-2  '>
        <CastForEducationIcon />
        <p>EduAssist</p>
      </div>
      <section className='col-span-1 flex flex-col  underline'>
        <NavLink to='/'>Home Page</NavLink>
        <NavLink to='/#how-it-works'>How It works</NavLink>
        <NavLink to='/#about-us'>About Us</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
      </section>
      <section className='col-span-1 justify-end'>
        <ul>
          <li>
            <a
              href='https://youtube.com/'
              className='flex gap-3 item-center bg-gray-900 text-white px-4 py-2 rounded-full w-36 my-2'
            >
              <YouTubeIcon />
              <p>Youtube</p>
            </a>
          </li>
          <li>
            <a
              href='https://twitter.com/'
              className='flex gap-3 item-center bg-gray-900 text-white px-4 py-2 rounded-full w-36 my-2'
            >
              <XIcon />
              <p>X</p>
            </a>
          </li>
          <li>
            <a
              href='https://linkedin.com/'
              className='flex gap-3 item-center bg-gray-900 text-white px-4 py-2 rounded-full w-36 my-2'
            >
              <LinkedInIcon />
              <p>Linkedin</p>
            </a>
          </li>
          <li>
            <a
              href='https://facebook.com/'
              className='flex gap-3 item-center bg-gray-900 text-white px-4 py-2 rounded-full w-36 my-2'
            >
              <FacebookIcon />
              <p>Facebook</p>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};
export default Footer;
