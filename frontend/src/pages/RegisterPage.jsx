const RegisterPage = () => {
  return (
    <div className='h-screen relative regBody'>
      <div className='flex flex-col items-center absolute top-0 bottom-0 left-0 right-0 overlay'>
        <h1 className='mt-20 text-white text-4xl capitalize font-semibold mb-2'>
          eduAssist Connect Platform
        </h1>
        <p className='text-white py-2 text-gray-400'>
          A place to connect students seeking for financial aid with potential
          donors.
        </p>
        <form className='w-1/3 rounded bg-white p-4'>
          <h1 className='text-center text-2xl font-semibold'>Register</h1>
          <div className='flex flex-col mb-2'>
            <label htmlFor='name' className='py-1 text-gray-600'>
              Full Name
            </label>
            <input
              type='text'
              placeholder='Matu Wamai'
              className='border py-2 px-4 focus:outline-emerald-300'
              id='name'
            />
          </div>
          <div className='flex flex-col mb-2'>
            <label htmlFor='email' className='py-1 text-gray-600'>
              Email
            </label>
            <input
              type='email'
              placeholder='youremail@example.com'
              className='border py-2 px-4 focus:outline-emerald-300'
              id='email'
            />
          </div>
          <button className="bg-emerald-300 py-2 px-4 text-white rounded text-lg font-semibold w-full">Submit</button>
          <div>
            {/* <label>Contact</label>
            <input
              type='number'
              placeholder='+254700699478'
              className=''
            ></input>
            <label>Password</label>
            <input type='password' placeholder='Abcd123' className=''></input>
            <label>Confirm Password</label>
            <input type='password' className=''></input>
            <label>Full Name</label>
            <input type='text' placeholder='Matu Wamai' className=''></input>
            <button>Submit</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
