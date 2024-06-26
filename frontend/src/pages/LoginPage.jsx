import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import { resetUserErr } from "../redux/slices/userSlices";
import Message from "../components/utils/Message";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.user);
  const [showPass, setShowPass] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "beneficiary",
  });
  const [formErr, setFormErr] = useState(null);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const togglePass = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (userData.email === "" || userData.password === ""){
      setFormErr("Please fill all the fields!");
      return;
    }
    if (userData.username !== "" && userData.password !== "") {
      dispatch(login(userData));
    }
  };

  useEffect(() => {
    if (userInfo?.token) {
      setUserData({
        email: "",
        passowrd: "",
        role: "beneficiary"
      });
      if (
        userInfo?.user?.user_type === "donor" ||
        userInfo?.user?.user_type === "admin"
      ) {
        navigate("/dashboard");
      } else if (userInfo?.user?.user_type === "beneficiary") {
        navigate("/profile");
      }
    } else if (error) {
      setUserData({
        email: "",
        password: "",
        role: "beneficiary",
      });
    }
  }, [navigate, userInfo, error]);

  return (
    <div className='h-screen relative regBody'>
      <div className='flex flex-col items-center absolute top-0 bottom-0 left-0 right-0 overlay px-4'>
        <h1 className='mt-28 text-white text-4xl capitalize font-semibold mb-2'>
          eduAssist Connect Platform
        </h1>
        <p className='text-white py-2 text-gray-400'>
          A place to connect students seeking for financial aid with potential
          donors.
        </p>
        <form
          className='w-full md:w-2/5 rounded bg-white p-4 border border-emerald-500'
          onSubmit={handleSubmit}
        >
          <h1 className='text-center text-2xl font-semibold'>Login</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            error && (
              <Message onClose={() => dispatch(resetUserErr())}>
                {error}
              </Message>
            )
          )}
          {formErr && (
            <Message onClose={() => setFormErr(null)}>{formErr}</Message>
          )}
          <div className='flex flex-col mb-2'>
            <label htmlFor='role' className='py-1 text-gray-600'>
              Select Role
            </label>
            <select
              value={userData.role}
              name='role'
              onChange={handleChange}
              className='border py-2 rounded px-2 focus:outline-emerald-300'
              required
            >
              <option>---Select Role---</option>
              <option value='donor'>Donor</option>
              <option value='beneficiary'>Beneficiary</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <div className='flex flex-col mb-2'>
            <label htmlFor='email' className='py-1 text-gray-600'>
              Email
            </label>
            <input
              type='email'
              placeholder='johndoe@example.com'
              className='border py-2 rounded px-2 focus:outline-emerald-300'
              id='email'
              required
              name='email'
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col mb-2'>
            <label htmlFor='password' className='py-1 text-gray-600'>
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              placeholder='********'
              className='border py-2 rounded px-2 focus:outline-emerald-300'
              id='password'
              required
              name='password'
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-3 my-3 text-gray-600' onClick={togglePass}>
            <RemoveRedEyeIcon />
            <p>Show password</p>
          </div>
          <button
            type='submit'
            className='bg-emerald-300 py-1 px-4 text-white rounded text-lg font-semibold w-full'
          >
            Sign In
          </button>
          <section className='flex  gap-1 text-emerald-500'>
            <p>Don&apos;t have an account?</p>
            <NavLink to='/register' className='underline capitalize'>
              <p>Sign up</p>
            </NavLink>
          </section>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
