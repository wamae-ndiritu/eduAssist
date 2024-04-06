import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import HorizontalLinearStepper from "./utils/Stepper";

const Profile = () => {
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];
      setProfileImage(URL.createObjectURL(selectedImage));
    };
  return (
    <div className='w-full bg-white my-12 flex flex-cols items-center justify-center'>
      <section className='md:w-4/5 px-12 py-4 shadow flex flex-col items-center'>
        <h1 className='text-4xl fontsemibold mb-3'>Update Profile Details</h1>
        <p className='text-gray-600 py-3'>
          Your information is a vital and required step in the processes of
          seeking financial aid. Please update any blank section, for you to
          start creating new applications.
        </p>
        <div className='my-4'>
          <HorizontalLinearStepper />
        </div>
        <div className='md:w-3/5 grid grid-cols-1 md:grid-cols-3 gap-3 border p-4 rounded'>
          <div className='col-span-1 flex items-center justify-center'>
            <div className='relative w-32 h-32 rounded-full border border-emerald-300'>
              <img
                src={profileImage ? profileImage : "/profile-icon.jpeg"}
                alt='Profile'
                className='h-full w-full rounded-full object-cover'
              />
              <span className='bg-emerald-500 h-8 w-8 rounded-full flex items-center justify-center absolute bottom-0 border border-white text-white edit-image-badge'>
                <label htmlFor='profile'>
                  <EditIcon />
                </label>
                <input
                  type='file'
                  name=''
                  id='profile'
                  className='image-input'
                  onChange={handleImageChange}
                />
              </span>
            </div>
          </div>
          <div className='col-span-1 md:col-span-2 flex flex-col justify-center'>
            <h2 className='text-3xl font-semibold my-auto'>
              Wamae Ndiritu{" "}
              <span className='bg-emerald-500 text-white rounded px-4 py-2 text-sm my-auto'>
                Wamae
              </span>
            </h2>
            <h6 className='text-gray-600 text-lg'>wamaejoseph392@gmail.com</h6>
            <p className='py-2 text-gray-600'>+254740924507</p>
          </div>
        </div>
        <section className='w-full grid grid-cols-1 md:grid-cols-4 gap-4 my-3'>
          <div className='col-span-1 md:col-span-2 border rounded p-4'>
            <h6 className='mb-2 font-semibold'>Personal Information</h6>
            <div className='w-full flex gap-3 items-center mb-2'>
              <label htmlFor='location' className="w-1/5">Location</label>
              <input
                type='text'
                id='location'
                placeholder='Nairobi'
                className='w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex gap-3 items-center mb-2'>
              <label htmlFor='city' className="w-1/5">City</label>
              <input
                type='text'
                id='city'
                placeholder='Nairobi'
                className='w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex gap-3 items-center mb-2'>
              <label htmlFor='address' className="w-1/5">Address</label>
              <input
                type='text'
                id='address'
                placeholder='Nairobi'
                className='w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex gap-3 items-center mb-2'>
              <label htmlFor='zip' className="w-1/5">ZIP Code</label>
              <input
                type='number'
                id='zip'
                placeholder='00100'
                className='w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex gap-3 items-center mb-2'>
              <label htmlFor='birth' className="w-1/5">Date of Birth</label>
              <input
                type='date'
                id='birth'
                placeholder='00100'
                className='w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
          </div>
          <div className='col-span-1 md:col-span-2 border rounded p-4'>
            <h6 className='mb-2 font-semibold'>
              Institution Information{" "}
              <span className='text-gray-600 text-sm'>
                (University/College/TVETs)
              </span>
            </h6>
            <div className='flex gap-3 items-center'>
              <label htmlFor='location'>Location</label>
              <input
                type='text'
                id='location'
                placeholder='Nairobi'
                className='border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Profile;
