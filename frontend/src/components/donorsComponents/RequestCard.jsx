import { Link } from "react-router-dom";
import moment from "moment";

const RequestCard = ({ info }) => {
  return (
    <div className='w-full bg-white border rounded p-4 relative'>
      <div className='flex gap-1 absolute top-1 right-1'>
        <div className='flex justify-between items-center'>
          <h1 className='text-gray-600 text-md uppercase my-auto'>
            Application No: #{info.id}
          </h1>
          <span
            className={`ml-2 bg-slate-100 rounded-full px-2 py-1 ${
              info.status === "pending"
                ? "text-blue-300"
                : info.status === "approved"
                ? "text-green-500"
                : info.status === "rejected" && "text-red-400"
            }`}
          >
            {info.status}
          </span>
        </div>
        <span className='bg-slate-100 rounded px-2 py-1 text-blue-300'>
          Created {moment(info.created_at).fromNow()}
        </span>
        <Link
          to={`/financial-requests/${info.id}`}
          className='bg-blue-400 rounded px-2 py-1 text-white'
        >
          View
        </Link>
      </div>
      <div className='flex gap-2 justify-start items-center'>
        <img
          src={info.profile_pic ? info.profile_pic : "/profile-icon.jpeg"}
          alt='Profile Icon'
          className='h-14 w-14 rounded-full border border-green-600 object-cover'
        />
        <span className='text-gray-600'>
          <h6>{info.full_name}</h6>
          <h6>{info.institution_name}</h6>
        </span>
      </div>
      <p className='text-gray-600 py-2 text-md'>{info.reason_for_aid}</p>
    </div>
  );
};

export default RequestCard;
