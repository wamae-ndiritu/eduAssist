import { NavLink } from "react-router-dom";
const RegisterPage = () => {
  return (
    <div className="h-screen relative regBody">
      <div className="flex flex-col items-center absolute top-0 bottom-0 left-0 right-0 overlay">
        <h1 className="mt-6 text-white text-4xl capitalize font-semibold mb-1">
          eduAssist Connect Platform
        </h1>
        <p className="text-white py-2 text-gray-400">
          A place to connect students seeking for financial aid with potential
          donors.
        </p>
        <form className="w-1/3 rounded bg-white p-4">
          <h1 className="text-center text-2xl font-semibold">Register</h1>
          <div className="flex flex-col mb-2">
            <label htmlFor="name" className="py-1 text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Matu Wamai"
              className="border pt-1 px-4 focus:outline-emerald-300"
              id="name"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="py-1 text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="youremail@example.com"
              className="border pt-1 px-4 focus:outline-emerald-300"
              id="email"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="py-1 text-gray-600">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="+254767301585"
              className="border pt-1 px-4 focus:outline-emerald-300"
              id="phone number"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="name" className="pt-1 text-gray-600">
              User Name
            </label>
            <input
              type="text"
              placeholder="Wamai"
              className="border pt-1 px-4 focus:outline-emerald-300"
              id="user name"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="py-1 text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="border pt-1 px-4 focus:outline-emerald-300"
              id="password"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="pt-1 text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder=""
              className="border pt-1 px-4 focus:outline-emerald-300"
              id="phone number"
            />
          </div>

          <button className="bg-emerald-300 py-1 px-4 text-white rounded text-lg font-semibold w-full">
            Submit
          </button>
          <section className="flex  gap-1 text-emerald-500">
            <p>Already have an account,</p>
            <NavLink to="/login" className="underline ">
              <p>Sign In</p>
            </NavLink>
          </section>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
