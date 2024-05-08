import { NavLink, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { register } from "../redux/actions/userActions";
import { resetUserErr } from "../redux/slices/userSlices";


const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, error, userInfo:user} = useSelector((state) => state.user);
  const [showOptions, setShowOptions] = useState(true);
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [showBeneficiaryForm, setShowBeneficiaryForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email: '',
    username: '',
    user_type: 'beneficiary',
    contact: '',
    password: '',
    confirm_pass: '',
  });

  const [donorForm, setDonorForm] = useState({
    full_name: '',
    email: '',
    contact: '',
    organization: '',
    national_id: '',
    username: '',
    password: '',
    confirmPassword: '',
    user_type: 'donor'
  });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }


  const handleDonorForm = (e) => {
    setDonorForm({...donorForm, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === 'beneficiary'){
      dispatch(register(userInfo));
    } else if (type === 'donor') {
      dispatch(register(donorForm));
    }
  }

  const toggleRegister = (type) => {
    setShowOptions(false);
    if (type === 'beneficiary'){
      setShowDonorForm(false);
      setShowBeneficiaryForm(true);
    } else if (type === 'donor') {
      setShowBeneficiaryForm(false);
      setShowDonorForm(true);
    }
  };

  const togglePass = () => {
    setShowPass(!showPass);
  }

  const handleGoBack = () => {
    setUserInfo({
      full_name: "",
      email: "",
      username: "",
      user_type: "beneficiary",
      contact: "",
      password: "",
      confirm_pass: "",
    });
    setDonorForm({
      full_name: "",
      email: "",
      contact: "",
      organization: "",
      national_id: "",
      username: "",
      password: "",
      confirmPassword: "",
      user_type: "donor",
    });
    setShowBeneficiaryForm(false);
    setShowDonorForm(false);
    setShowOptions(true);
  }

  useEffect(() => {
    if (user?.token){
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
      setDonorForm({
        full_name: "",
        email: "",
        contact: "",
        organization: "",
        national_id: "",
        username: "",
        password: "",
        confirmPassword: "",
        user_type: "donor",
      });
    }
  }, [navigate, user, error])

    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => {
          dispatch(resetUserErr());
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [dispatch, error]);

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
        {showOptions ? (
          <div className='w-full md:w-2/5 rounded bg-white p-4 my-5 border border-emerald-500'>
            <h1 className='text-xl mb-1 text-green-600 uppercase font-semibold'>
              Choose your Role to Register
            </h1>
            <div className='flex gap-3'>
              <div className='h-full flex-1 border p-4'>
                <img src='/eduassit.png' alt='Donor' className='flex-1' />
                <p className='py-3 text-gray-600 text-sm'>
                  Are you a donor looking for needy students to help?
                </p>
                <button
                  className='bg-amber-400 py-1 mb-3 px-4 text-white rounded text-lg font-semibold w-full'
                  onClick={() => toggleRegister("donor")}
                >
                  Donor
                </button>
              </div>
              <div className='h-full flex-1 border p-4'>
                <img
                  src='/eduassit.png'
                  alt='Beneficiary'
                  className='h-76 object-cover'
                />
                <p className='py-3 text-gray-600 text-sm'>
                  Are you a needy student looking for a financial aid?
                </p>
                <button
                  className='bg-green-600 py-1 mb-3 px-4 text-white rounded text-lg font-semibold w-full'
                  onClick={() => toggleRegister("beneficiary")}
                >
                  Beneficiary
                </button>
              </div>
            </div>
          </div>
        ) : showDonorForm ? (
          <form
            className='w-full md:w-2/5 rounded bg-white p-4 my-5 border border-emerald-500'
            onSubmit={() => handleSubmit("donor")}
          >
            <h1 className='text-center text-2xl font-semibold'>
              Register as a Donor
            </h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              error && (
                <p className='bg-red-500 py-2 px-4 rounded text-white'>
                  {error}
                </p>
              )
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className='col-span-1 flex flex-col mb-2'>
                <label htmlFor='name' className='py-1 text-gray-600'>
                  Full Name
                </label>
                <input
                  type='text'
                  placeholder='John Doe'
                  className='border rounded py-2 px-2 focus:outline-emerald-300'
                  id='name'
                  required
                  name='full_name'
                  value={donorForm.full_name}
                  onChange={handleDonorForm}
                />
              </div>
              <div className='col-span-1 flex flex-col mb-2'>
                <label htmlFor='email' className='py-1 text-gray-600'>
                  Email
                </label>
                <input
                  type='email'
                  required
                  placeholder='johndoe@gmail.com'
                  className='border py-2 rounded px-2 focus:outline-emerald-300'
                  id='email'
                  name='email'
                  value={donorForm.email}
                  onChange={handleDonorForm}
                />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className='col-span-1 flex flex-col mb-2'>
                <label htmlFor='username' className='py-1 text-gray-600'>
                  Username
                </label>
                <input
                  type='text'
                  className='border rounded py-2 px-2 focus:outline-emerald-300'
                  id='username'
                  required
                  name='username'
                  value={donorForm.username}
                  onChange={handleDonorForm}
                />
              </div>
              <div className='col-span-1 flex flex-col mb-2'>
                <label htmlFor='org' className='py-1 text-gray-600'>
                  Organization
                </label>
                <input
                  type='text'
                  required
                  className='border py-2 rounded px-2 focus:outline-emerald-300'
                  id='org'
                  name='organization'
                  value={donorForm.organization}
                  onChange={handleDonorForm}
                />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className='col-span-1 flex flex-col mb-2'>
                <label htmlFor='national_id' className='py-1 text-gray-600'>
                  National ID NO
                </label>
                <input
                  type='number'
                  className='border rounded py-2 px-2 focus:outline-emerald-300'
                  id='national_id'
                  required
                  name='national_id'
                  value={donorForm.national_id}
                  onChange={handleDonorForm}
                />
              </div>
              <div className='col-span-1 flex flex-col mb-2'>
                <label htmlFor='Contact' className='py-1 text-gray-600'>
                  Contact
                </label>
                <input
                  type='text'
                  required
                  className='border py-2 rounded px-2 focus:outline-emerald-300'
                  id='Contact'
                  name='contact'
                  value={donorForm.contact}
                  onChange={handleDonorForm}
                />
              </div>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5 flex items-end'>
              <div className='flex flex-col'>
                <label htmlFor='email' className='py-1 text-gray-600'>
                  Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  className='border py-2 rounded px-2 focus:outline-emerald-300'
                  id='password'
                  required
                  name='password'
                  value={donorForm.password}
                  onChange={handleDonorForm}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='confirmPass' className='pt-1 text-gray-600'>
                  Confirm Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  className='border py-2 rounded px-2 focus:outline-emerald-300'
                  id='confirmPass'
                  required
                  name='confirmPassword'
                  value={donorForm.confirmPassowrd}
                  onChange={handleDonorForm}
                />
              </div>
            </div>
            <button
              type='button'
              className='flex gap-3 my-2 text-gray-600'
              onClick={togglePass}
            >
              <RemoveRedEyeIcon />
              <p>Show password</p>
            </button>
            <button
              type='submit'
              className='bg-green-600 py-1 px-4 text-white rounded text-lg font-semibold w-full'
            >
              Submit
            </button>
            <section className='flex justify-between items-center my-2'>
              <span className='flex gap-1 text-emerald-500'>
                <p>Already have an account?</p>
                <NavLink to='/login' className='underline '>
                  <p>Sign In</p>
                </NavLink>
              </span>
              <button
                type='button'
                className='bg-gray-900 text-white px-4 py-1 rounded '
                onClick={handleGoBack}
              >
                Go Back
              </button>
            </section>
          </form>
        ) : (
          showBeneficiaryForm && (
            <form
              className='w-full md:w-2/5 rounded bg-white p-4 my-5 border border-emerald-500'
              onSubmit={() => handleSubmit("beneficiary")}
            >
              <h1 className='text-center text-2xl font-semibold'>
                Register as a Beneficiary
              </h1>
              {loading ? (
                <p>Loading...</p>
              ) : (
                error && (
                  <p className='bg-red-500 py-2 px-4 rounded text-white'>
                    {error}
                  </p>
                )
              )}
              <div className='flex flex-col mb-2'>
                <label htmlFor='b_name' className='py-1 text-gray-600'>
                  Full Name
                </label>
                <input
                  type='text'
                  placeholder='Walter White'
                  className='border py-2 rounded px-2 focus:outline-emerald-300'
                  id='b_name'
                  required
                  name='full_name'
                  value={userInfo.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col mb-2'>
                <label htmlFor='b_email' className='py-1 text-gray-600'>
                  Email
                </label>
                <input
                  type='email'
                  placeholder='walterwhite@gmail.com'
                  required
                  className='border py-2 rounded px-2 focus:outline-emerald-300'
                  id='b_email'
                  name='email'
                  value={userInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3 flex items-end'>
                <div className='col-span-1 flex flex-col mb-2'>
                  <label htmlFor='b_contact' className='py-1 text-gray-600'>
                    Contact
                  </label>
                  <input
                    type='number'
                    className='border py-2 rounded px-2 focus:outline-emerald-300'
                    id='b_contact'
                    required
                    name='contact'
                    value={userInfo.contact}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-span-1 flex flex-col mb-2'>
                  <label htmlFor='b_username' className='pt-1 text-gray-600'>
                    User Name
                  </label>
                  <input
                    type='text'
                    className='border py-2 rounded px-2 focus:outline-emerald-300'
                    id='b_username'
                    required
                    name='username'
                    value={userInfo.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3 flex items-end'>
                <div className='flex flex-col'>
                  <label htmlFor='b_password' className='py-1 text-gray-600'>
                    Password
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    className='border py-2 rounded px-2 focus:outline-emerald-300'
                    id='b_password'
                    name='password'
                    value={userInfo.password}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='b_confirm_pass' className='pt-1 text-gray-600'>
                    Confirm Password
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    className='border py-2 rounded px-2 focus:outline-emerald-300'
                    id='b_confirm_pass'
                    name='confirm_pass'
                    value={userInfo.confirm_pass}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button type='button' className='flex gap-3 my-2 text-gray-600' onClick={togglePass}>
                <RemoveRedEyeIcon />
                <p>Show password</p>
              </button>
              <button
                type='submit'
                className='bg-green-600 py-1 px-4 text-white rounded text-lg font-semibold w-full'
              >
                Submit
              </button>
              <section className='flex justify-between items-center my-2'>
                <span className='flex gap-1 text-emerald-500'>
                  <p>Already have an account?</p>
                  <NavLink to='/login' className='underline '>
                    <p>Sign In</p>
                  </NavLink>
                </span>
                <button
                  type='button'
                  className='bg-gray-900 text-white px-4 py-1 rounded '
                  onClick={handleGoBack}
                >
                  Go Back
                </button>
              </section>
            </form>
          )
        )}
      </div>
    </div>
  );
};
export default RegisterPage;
