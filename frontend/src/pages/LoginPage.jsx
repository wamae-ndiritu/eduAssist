import { NavLink } from "react-router-dom";
import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);

  const togglePass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  return (
    <div className="h-screen relative regBody">
      <div className="flex flex-col items-center absolute top-0 bottom-0 left-0 right-0 overlay">
        <h1 className="mt-40 text-white text-4xl capitalize font-semibold mb-2">
          eduAssist Connect Platform
        </h1>
        <p className="text-white py-2 text-gray-400">
          A place to connect students seeking for financial aid with potential
          donors.
        </p>
        <form className="w-1/3 rounded bg-white p-4">
          <h1 className="text-center text-2xl font-semibold">Login</h1>
          <div className="flex flex-col mb-2">
            <label htmlFor="name" className="py-1 text-gray-600">
              User Name
            </label>
            <input
              type="text"
              placeholder="Wamai"
              className="border py-1 px-4 focus:outline-emerald-300"
              id="name"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="name" className="py-1 text-gray-600">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="********"
              className="border py-1 px-4 focus:outline-emerald-300"
              id="password"
            />
            <button className="flex gap-1" onClick={togglePass}>
              <RemoveRedEyeIcon />
              <p>Show password</p>
            </button>
          </div>
          <button className="bg-emerald-300 py-1 px-4 text-white rounded text-lg font-semibold w-full">
            Sign In
          </button>
          <section className="flex  gap-1 text-emerald-500">
            <p>Don`t have an account,</p>
            <NavLink to="/register" className="underline ">
              <p>Sign up</p>
            </NavLink>
          </section>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
