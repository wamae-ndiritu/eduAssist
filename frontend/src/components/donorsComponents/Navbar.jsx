import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className='bg-emerald-300  px-4 py-2 flex justify-between items-center'>
      <h4 className='text-xl font-semibold'>Donors Dashboard</h4>
      <div className='flex items-center gap-3'>
        <span className='flex flex-col items-end text-sm text-gray-600 text-right'>
          {userInfo?.user?.user_type === "donor" && (
            <span className='bg-green-600 px-4 py-1 rounded text-white my-1'>
              Donor
            </span>
          )}
          <h6 className='uppercase text-gray-900'>
            {userInfo?.user?.full_name}
          </h6>
        </span>
        <Link to='/profile'>
          <img
            src='/profile-icon.jpeg'
            alt='profile'
            className='h-16 w-16 rounded-full border border-green-600 object-cover'
          />
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
