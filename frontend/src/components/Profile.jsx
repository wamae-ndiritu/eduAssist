import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import DocumentUpload from "./utils/DocumentUpload";
import { useDispatch, useSelector } from "react-redux";
import DescriptionIcon from "@mui/icons-material/Description";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import { getProfileInfo, updateProfile } from "../redux/actions/userActions";
import { validateObject } from "../helpers";
import Message from "./utils/Message";
import { resetUserErr } from "../redux/slices/userSlices";
import ProfileUpdateProgress from "./ProfileUpdateProgress";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

export const ProfileHead = ({profile}) => {
  const bucket_url = import.meta.env.VITE_APP_BUCKET_URL;

  const dispatch = useDispatch();
  const {
    userInfo: { user },
  } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const fileName = new Date().getTime() + selectedImage.name;
    const storage = getStorage(app, bucket_url);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfileImage(downloadURL);
          dispatch(
            updateProfile("profilePicture", { profile_pic: downloadURL })
          );
        });
      }
    );
  };

  useEffect(() => {
    setProfileImage(profile?.profile_pic);
  }, [profile]);

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
};

const Profile = () => {
  const dispatch = useDispatch();

  const { profileInfo, profileUpdates, loading, error } = useSelector(
    (state) => state.user
  );

  const [personalInfo, setPersonalInfo] = useState({
    location: "",
    city: "",
    address: "",
    zip_code: "",
    date_of_birth: "",
  });
  const [institutionInfo, setInstitutionInfo] = useState({
    name: "",
    course: "",
    level: "",
    year_joined: "",
    expected_graduation: "",
  });
  const [personalInfoFormErr, setPersonalInfoFormErr] = useState(null);
  const [personalInfoUpdateSuccess, setPersonalInfoUpdateSuccess] =
    useState(null);
  const [institutionInfoFormErr, setInstitutionFormErr] = useState(null);
  const [institutionInfoUpdateSuccess, setInstitutionInfoUpdateSuccess] =
    useState(null);

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleInstitutionInfoChange = (e) => {
    setInstitutionInfo({ ...institutionInfo, [e.target.name]: e.target.value });
  };

  const handlePersonalInfoSave = () => {
    const emptyKey = validateObject(personalInfo);
    if (emptyKey) {
      setPersonalInfoFormErr(`${emptyKey} is required!`);
      return;
    }
    dispatch(updateProfile("personal", personalInfo));
  };

  const handleInstitutionInfoSave = () => {
    const emptyKey = validateObject(institutionInfo);
    if (emptyKey) {
      setInstitutionFormErr(`${emptyKey} is required!`);
      return;
    }
    dispatch(updateProfile("institution", institutionInfo));
  };

  useEffect(() => {
    dispatch(getProfileInfo());
  }, [dispatch, profileUpdates]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        dispatch(resetUserErr());
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [dispatch, error]);

  console.log(profileInfo)

  useEffect(() => {
    if (profileInfo.personal_info_updated) {
      const newObj = {
        location: profileInfo.location || "",
        city: profileInfo.city || "",
        address: profileInfo.address || "",
        zip_code: profileInfo.zip_code || "",
        date_of_birth: profileInfo.date_of_birth || "",
      };
      setPersonalInfo(newObj);
    }
    if (profileInfo.institution_details_updated) {
      const newObj = {
        name: profileInfo.institution_name || "",
        course: profileInfo.course_name || "",
        level: profileInfo.education_level || "",
        year_joined: profileInfo.year_joined || "",
        expected_graduation: profileInfo.expected_graduation || "",
      };
      setInstitutionInfo(newObj);
    }
    if (profileUpdates.personal) {
      setPersonalInfoUpdateSuccess("Personal Information updated!");
    } else if (profileUpdates.institution) {
      setInstitutionInfoUpdateSuccess("Institution Information updated!");
    }
  }, [profileInfo, profileUpdates]);

  return (
    <div className='w-full bg-white my-12 flex flex-cols items-center justify-center'>
      <section className='w-full md:w-4/5 px-4 md:px-12 py-4 border flex flex-col items-center'>
        <h1 className='text-3xl font-semibold my-5'>Update Profile Details</h1>
        <p className='text-gray-600 py-3'>
          Your information is a vital and required step in the processes of
          seeking financial aid. Please update any blank section, for you to
          start creating new applications.
        </p>
        <ProfileHead profile={profileInfo} />
        <ProfileUpdateProgress
          institutionDone={profileInfo.institution_details_updated}
          personalInfoDone={profileInfo.personal_info_updated}
          documentsDone={profileInfo.documents_updated}
          profilePictureDone={profileInfo.profile_pic !== null}
        />
        {loading && <p className='text-sm text-gray-600 py-1'>Saving...</p>}
        {error && (
          <Message onClose={() => dispatch(resetUserErr())}>{error}</Message>
        )}
        <section className='w-full grid grid-cols-1 md:grid-cols-4 gap-4 my-3'>
          <div className='col-span-1 md:col-span-2 border rounded p-4'>
            {personalInfoFormErr && (
              <Message onClose={() => setPersonalInfoFormErr(null)}>
                {personalInfoFormErr}
              </Message>
            )}
            {personalInfoUpdateSuccess && (
              <Message
                variant='success'
                onClose={() => setPersonalInfoUpdateSuccess(null)}
              >
                {personalInfoUpdateSuccess}
              </Message>
            )}
            <div className='w-full flex justify-between items-center my-2'>
              <h6 className='my-auto font-semibold'>Personal Information</h6>
              <button
                className='bg-green-500 text-white px-4 py-1 rounded'
                onClick={handlePersonalInfoSave}
              >
                Save
              </button>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='location' className='md:w-1/5'>
                Location
              </label>
              <input
                type='text'
                id='location'
                placeholder='Nairobi'
                className='md:w-4/5 border px-4 py-2 rounded focus:outline-emerald-300'
                value={personalInfo.location}
                name='location'
                onChange={handlePersonalInfoChange}
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
                value={personalInfo.city}
                name='city'
                onChange={handlePersonalInfoChange}
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
                value={personalInfo.address}
                name='address'
                onChange={handlePersonalInfoChange}
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
                value={personalInfo.zip_code}
                name='zip_code'
                onChange={handlePersonalInfoChange}
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
                value={personalInfo.date_of_birth}
                name='date_of_birth'
                onChange={handlePersonalInfoChange}
              />
            </div>
          </div>
          <div className='col-span-1 md:col-span-2 border rounded p-4'>
            {institutionInfoFormErr && (
              <Message onClose={() => setInstitutionFormErr(null)}>
                {institutionInfoFormErr}
              </Message>
            )}
            {institutionInfoUpdateSuccess && (
              <Message
                variant='success'
                onClose={() => setInstitutionInfoUpdateSuccess(null)}
              >
                {institutionInfoUpdateSuccess}
              </Message>
            )}
            <div className='w-full flex justify-between items-center my-2'>
              <h6 className='mb-2 font-semibold'>
                Institution Information{" "}
                <span className='text-gray-600 text-sm'>
                  (University/College/TVETs)
                </span>
              </h6>
              <button
                className='bg-green-500 text-white px-4 py-1 rounded'
                onClick={handleInstitutionInfoSave}
              >
                Save
              </button>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='institution' className='md:w-2/5'>
                Institution Name
              </label>
              <input
                type='text'
                id='institution'
                placeholder='University of Nairobi'
                className='md:w-3/5 border px-4 py-2 rounded focus:outline-emerald-300'
                value={institutionInfo.name}
                name='name'
                onChange={handleInstitutionInfoChange}
              />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-3 md:items-center mb-2'>
              <label htmlFor='level' className='md:w-2/5'>
                Education Level
              </label>
              <select
                className='md:w-3/5 border px-4 py-2 rounded focus:outline-emerald-300'
                id='level'
                value={institutionInfo.level}
                name='level'
                onChange={handleInstitutionInfoChange}
              >
                <option>--Select Level--</option>
                <option value='certificate'>Certificate</option>
                <option value='diploma'>Diploma</option>
                <option value='undergraduate'>Undergraduate</option>
                <option value='postgraduate'>Postgraduate</option>
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
                value={institutionInfo.course}
                name='course'
                onChange={handleInstitutionInfoChange}
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
                value={institutionInfo.year_joined}
                name='year_joined'
                onChange={handleInstitutionInfoChange}
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
                value={institutionInfo.expected_graduation}
                name='expected_graduation'
                onChange={handleInstitutionInfoChange}
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
