import { Link } from "react-router-dom";
import moment from "moment";

const RequestCard = ({info}) => {
  console.log(info)
  return (
    <div className='w-full bg-white border rounded p-4 relative'>
      <div className='flex gap-1 absolute top-1 right-1'>
        <Link
          to={`/financial-requests/1`}
          className='bg-gray-900 rounded px-4 py-1 text-white'
        >
          View
        </Link>
        <span className='bg-blue-100 rounded px-4 py-1 text-blue-500'>
          {moment(info.created_at).fromNow()}
        </span>
      </div>
      <div className='flex gap-2 justify-start items-center'>
        <img
          src='/profile-icon.jpeg'
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
}

export default RequestCard