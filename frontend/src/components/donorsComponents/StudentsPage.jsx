import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { listBeneficiaries } from "../../redux/actions/userActions";
import Message from "../utils/Message";
import { resetUserErr } from "../../redux/slices/userSlices";

const StudentsPage = () => {
  const dispatch = useDispatch();

  const {studentsList, loading, error} = useSelector((state) => state.user);

  const handleDeleteUser = (id) => {
    console.log("deleting user...")
  }

  useEffect(() => {
    dispatch(listBeneficiaries());
  }, [dispatch])
  return (
    <div>
      <h2 className='my-3 text-2xl font-semibold text-green-500'>Students</h2>
      <section className='w-full overflow-x-auto'>
        {loading && <p>Loading...</p>}
        {error && (
          <Message onClose={() => dispatch(resetUserErr())}>{error}</Message>
        )}
        {/* {deleted && (
          <span className='flex items-center justify-between my-1 bg-green-100 w-full py-2 px-4 rounded border border-green-400 text-green-700'>
            <p>User has been deleted successfully!</p>
          </span>
        )} */}
        <table className='w-max border border-gray-400 text-gray-600'>
          <thead className=''>
            <tr className=''>
              <th className='border border-gray-400 p-2 text-left'>#</th>
              <th className='border border-gray-400 p-2 text-left'>PROFILE</th>
              <th className='border border-gray-400 p-2 text-left'>
                FULL NAME
              </th>
              <th className='border border-gray-400 p-2 text-left'>EMAIL</th>
              <th className='border border-gray-400 p-2 text-left'>USERNAME</th>
              <th className='border border-gray-400 p-2 text-left'>CONTACT</th>
              <th className='border border-gray-400 p-2 text-left'>
                INSTITUTION
              </th>
              <th className='border border-gray-400 p-2 text-left'>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((student, index) => (
              <tr key={index}>
                <td className='border border-gray-400 px-2'>{index + 1}</td>
                <td className='border border-gray-400 px-2'>
                  <img
                    src={student.profile_pic || "/profile-icon.jpeg"}
                    alt={student.username}
                    className='w-10 h-10 border border-green-500 rounded-full object-cover'
                  />
                </td>
                <td className='border border-gray-400 p-2'>
                  {student.full_name}
                </td>
                <td className='border border-gray-400 p-2'>{student.email}</td>
                <td className='border border-gray-400 p-2'>
                  {student.username}
                </td>
                <td className='border border-gray-400 p-2'>
                  {student.contact}
                </td>
                <td className='border border-gray-400 p-2 uppercase text-md'>
                  {student.institution}
                </td>
                <td className='flex gap-1 border-b border-gray-400 p-2'>
                  <button className='bg-blue-300 text-white rounded px-2 py-1 text-xs'>
                    View
                  </button>
                  <button
                    className='bg-red-500 text-white rounded px-2 py-1 text-xs'
                    onClick={() => handleDeleteUser(student.user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default StudentsPage