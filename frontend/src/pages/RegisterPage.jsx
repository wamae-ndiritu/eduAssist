import { NavLink, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { register } from "../redux/actions/userActions";


const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, error, userInfo:user} = useSelector((state) => state.user)
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email: '',
    username: '',
    user_type: 'beneficiary',
    contact: '',
    password: '',
    confirm_pass: '',
  });

  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userInfo));
  }

  useEffect(() => {
    if (user){
      setUserInfo({
        full_name: "",
        email: "",
        username: "",
        user_type: "beneficiary",
        contact: "",
        password: "",
        confirm_pass: "",
      });
      navigate('/')
    }
    else if (error){
      setUserInfo({
        full_name: "",
        email: "",
        username: "",
        user_type: "beneficiary",
        contact: "",
        password: "",
        confirm_pass: "",
      });
    }
  }, [navigate, user, error])

  return (
    <div className='h-screen py-16 relative regBody bg-emerald-500'>
      <div className='flex flex-col items-center absolute top-0 bottom-0 left-0 right-0 overlay px-4'>
        <h1 className='mt-6 text-white text-2xl md:text-4xl text-center capitalize font-semibold mb-1'>
          eduAssist Connect Platform
        </h1>
        <p className='text-white text-center px-4 text-gray-400'>
          A place to connect students seeking for financial aid with potential
          donors.
        </p>
        <form
          className='w-full md:w-2/5 rounded bg-white p-4 my-5 border border-emerald-500'
          onSubmit={handleSubmit}
        >
          <h1 className='text-center text-2xl font-semibold'>Register</h1>
          {loading ? <p>Loading...</p> : error && <p className="bg-red-500 py-2 px-4 rounded text-white">{error}</p>
          }
          <div className='flex flex-col mb-2'>
            <label htmlFor='name' className='py-1 text-gray-600'>
              Full Name
            </label>
            <input
              type='text'
              placeholder='Matu Wamai'
              className='border py-1 px-2 focus:outline-emerald-300'
              id='name'
              name='full_name'
              value={userInfo.name}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col mb-2'>
            <label htmlFor='email' className='py-1 text-gray-600'>
              Email
            </label>
            <input
              type='email'
              placeholder='youremail@example.com'
              className='border py-1 px-2 focus:outline-emerald-300'
              id='email'
              name='email'
              value={userInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3 flex items-end'>
            <div className='col-span-1 flex flex-col mb-2'>
              <label htmlFor='contact' className='py-1 text-gray-600'>
                Phone Number
              </label>
              <input
                type='number'
                placeholder='+254767301585'
                className='border py-1 px-2 focus:outline-emerald-300'
                id='contact'
                name='contact'
                value={userInfo.contact}
                onChange={handleChange}
              />
            </div>
            <div className='col-span-1 flex flex-col mb-2'>
              <label htmlFor='username' className='pt-1 text-gray-600'>
                User Name
              </label>
              <input
                type='text'
                placeholder='Wamai'
                className='border py-1 px-2 focus:outline-emerald-300'
                id='username'
                name='username'
                value={userInfo.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3 flex items-end'>
            <div className='flex flex-col mb-2'>
              <label htmlFor='email' className='py-1 text-gray-600'>
                Password
              </label>
              <input
                type='password'
                placeholder='********'
                className='border py-1 px-2 focus:outline-emerald-300'
                id='password'
                name='password'
                value={userInfo.password}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor='confirm_pass' className='pt-1 text-gray-600'>
                Confirm Password
              </label>
              <input
                type='password'
                placeholder='********'
                className='border py-1 px-2 focus:outline-emerald-300'
                id='confirm_pass'
                name='confirm_pass'
                value={userInfo.confirm_pass}
                onChange={handleChange}
              />
            </div>
          </div>
          <h6 className='text-gray-600 text-xl py-1'>Select account type</h6>
          <div className='flex gap-10'>
            <div className='flex gap-3 items-center'>
              <input
                type='radio'
                className='h-6 w-6 text-xl'
                name='user_type'
                value='beneficiary'
                onChange={handleChange}
              />
              <label htmlFor='beneficiary_ac' className='text-gray-600'>
                Beneficiary (Student)
              </label>
            </div>
            <div className='flex gap-3 items-center'>
              <input
                type='radio'
                className='h-6 w-6 text-xl'
                name='user_type'
                value='donor'
                onChange={handleChange}
              />
              <label htmlFor='donor_ac' className='text-gray-600'>
                Donor
              </label>
            </div>
          </div>
          <button className='flex gap-3 my-2 text-gray-600'>
            <RemoveRedEyeIcon />
            <p>Show password</p>
          </button>
          <button
            type='submit'
            className='bg-emerald-300 py-1 px-4 text-white rounded text-lg font-semibold w-full'
          >
            Submit
          </button>
          <section className='flex  gap-1 text-emerald-500'>
            <p>Already have an account,</p>
            <NavLink to='/login' className='underline '>
              <p>Sign In</p>
            </NavLink>
          </section>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
