import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import DocumentUpload from "./utils/DocumentUpload";
import { useSelector } from "react-redux";
import DescriptionIcon from "@mui/icons-material/Description";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";

export const ProfileHead = () => {
  const {
    userInfo: { user },
  } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setProfileImage(URL.createObjectURL(selectedImage));
  };
  return (
    <section className='w-full grid grid-cols-1 md:grid-cols-7 gap-3'>
      <div className='col-span-1 md:col-span-2 border rounded p-4'>
        <ul>
          <li className='mb-2'>
            <Link
              to='/profile'
              className='shadow-sm flex gap-3 items-center bg-slate-100 px-4 py-2 rounded text-gray-600 hover:bg-emerald-300 hover:text-white'
            >
              <ManageAccountsIcon /> <h6>Account</h6>
            </Link>
          </li>
          <li className='mb-2'>
            <Link
              to='/profile/applications/new'
              className='shadow-sm flex gap-3 items-center bg-slate-100 px-4 py-2 rounded text-gray-600 hover:bg-emerald-300 hover:text-white'
            >
              <LibraryAddIcon /> <h6>New Application</h6>
            </Link>
          </li>
          <li className='mb-2'>
            <Link
              to='/profile/applications/1'
              className='shadow-sm flex gap-3 items-center bg-slate-100 px-4 py-2 rounded text-gray-600 hover:bg-emerald-300 hover:text-white'
            >
              <DescriptionIcon /> <h6>My Applications</h6>
            </Link>
          </li>
          <li className='mb-2'>
            <Link
              to='/profile/messages/1'
              className='shadow-sm flex gap-3 items-center bg-slate-100 px-4 py-2 rounded text-gray-600 hover:bg-emerald-300 hover:text-white'
            >
              <CommentIcon /> <h6>Messages</h6>
            </Link>
          </li>
        </ul>
      </div>
      <div className='col-span-1 md:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-3 border p-4 rounded'>
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
          <h2 className='flex gap-5 items-center text-2xl font-semibold my-1'>
            {user?.full_name}
            <span className='bg-emerald-500 text-white rounded px-4 py-2 text-sm my-auto'>
              {user?.username}
            </span>
          </h2>
          <h6 className='text-gray-600 text-lg my-0'>{user?.email}</h6>
          <p className='py-2 text-gray-600'>{user?.contact}</p>
        </div>
      </div>
    </section>
  );
}

const Profile = () => {
  const {
    userInfo: { user },
  } = useSelector((state) => state.user);

  console.log(user);
  return (
    <div className='w-full bg-white my-12 flex flex-cols items-center justify-center'>
      <section className='w-full md:w-4/5 px-4 md:px-12 py-4 border flex flex-col items-center'>
        <h1 className='text-3xl font-semibold my-5'>Update Profile Details</h1>
        <p className='text-gray-600 py-3'>
          Your information is a vital and required step in the processes of
          seeking financial aid. Please update any blank section, for you to
          start creating new applications.
        </p>
        <ProfileHead />
        <section className='w-full grid grid-cols-1 md:grid-cols-4 gap-4 my-3'>
          <div className='col-span-1 md:col-span-2 border rounded p-4'>
            <h6 className='mb-2 font-semibold'>Personal Information</h6>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='location' className='md:w-1/5'>
                Location
              </label>
              <input
                type='text'
                id='location'
                placeholder='Nairobi'
                className='md:w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='city' className='md:w-1/5'>
                City
              </label>
              <input
                type='text'
                id='city'
                placeholder='Nairobi'
                className='md:w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='address' className='md:w-1/5'>
                Address
              </label>
              <input
                type='text'
                id='address'
                placeholder='Nairobi'
                className='md:w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='zip' className='md:w-1/5'>
                ZIP Code
              </label>
              <input
                type='number'
                id='zip'
                placeholder='00100'
                className='md:w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='birth' className='md:w-1/5'>
                Date of Birth
              </label>
              <input
                type='date'
                id='birth'
                placeholder='00100'
                className='md:w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
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
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='institution' className='md:w-2/5'>
                Institution Name
              </label>
              <input
                type='text'
                id='institution'
                placeholder='University of Nairobi'
                className='md:w-3/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='level' className='md:w-2/5'>
                Education Level
              </label>
              <select
                className='md:w-3/5 border px-4 py-2 rounded focus:outline-emerald-300'
                id='level'
              >
                <option>Certificate</option>
                <option>Diploma</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
              </select>
            </div>
            <div className='md:w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='course_name' className='md:w-2/5'>
                Course Name
              </label>
              <input
                type='text'
                id='course_name'
                placeholder='Bachelor of Education ICT'
                className='md:w-3/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='year_joined' className='md:w-2/5'>
                Year Joined
              </label>
              <input
                type='number'
                id='year_joined'
                placeholder='2020'
                className='md:w-3/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='graduation' className='md:w-2/5'>
                Expected Graduation
              </label>
              <input
                type='number'
                id='graduation'
                placeholder='2024'
                className='md:w-3/5 border px-4 py-2 rounded focus:outline-emerald-300'
              />
            </div>
          </div>
        </section>
        <section className='w-full border p-4 my-3'>
          <DocumentUpload />
        </section>
      </section>
    </div>
  );
};

export default Profile;
