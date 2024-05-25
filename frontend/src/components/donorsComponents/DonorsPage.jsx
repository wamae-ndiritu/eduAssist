import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  approveDisapproveDonor,
  deleteUser,
  listDonors,
} from "../../redux/actions/userActions";
import Message from "../utils/Message";
import { resetUserErr } from "../../redux/slices/userSlices";

const DonorsPage = () => {
  const dispatch = useDispatch();

  const { donorsList, loading, error, deleted, donorStatusUpdated } =
    useSelector((state) => state.user);

  const handleDeleteUser = (id) => {
    alert("Are you sure you want to delete the user!");
    dispatch(deleteUser(id));
  };

  const handleDonorStatus = (id, actionType) => {
    dispatch(approveDisapproveDonor(id, actionType));
  };

  useEffect(() => {
    dispatch(listDonors());
  }, [dispatch]);

  useEffect(() => {
    if (donorStatusUpdated || deleted) {
      dispatch(listDonors());
    }
  }, [dispatch, donorStatusUpdated, deleted]);
  return (
    <div>
      <h2 className='my-3 text-2xl font-semibold text-green-500'>Donors</h2>
      <section className='w-full overflow-x-auto'>
        {loading && <p>Loading...</p>}
        {error && (
          <Message onClose={() => dispatch(resetUserErr())}>{error}</Message>
        )}
        {deleted && (
          <Message variant='success' onClose={() => dispatch(resetUserErr())}>
            User has been deleted successfully!
          </Message>
        )}
        <table className='w-max border border-gray-400 text-gray-600'>
          <thead className=''>
            <tr className=''>
              <th className='border border-gray-400 p-2 text-left'>#</th>
              <th className='border border-gray-400 p-2 text-left'>PROFILE</th>
              <th className='border border-gray-400 p-2 text-left'>
                N. ID/PASSPORT
              </th>
              <th className='border border-gray-400 p-2 text-left'>
                FULL NAME
              </th>
              <th className='border border-gray-400 p-2 text-left'>EMAIL</th>
              <th className='border border-gray-400 p-2 text-left'>USERNAME</th>
              <th className='border border-gray-400 p-2 text-left'>CONTACT</th>
              <th className='border border-gray-400 p-2 text-left'>
                ORGANIZATION
              </th>
              <th className='border border-gray-400 p-2 text-left'>STATUS</th>
              <th className='border border-gray-400 p-2 text-left'>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {donorsList.map((donor, index) => (
              <tr key={index}>
                <td className='border border-gray-400 px-2'>{index + 1}</td>
                <td className='border border-gray-400 px-2'>
                  <img
                    src={donor.profile_pic || "/profile-icon.jpeg"}
                    alt={donor.username}
                    className='w-10 h-10 border border-green-500 rounded-full object-cover'
                  />
                </td>
                <td className='border border-gray-400 p-2'>
                  {donor.national_id}
                </td>
                <td className='border border-gray-400 p-2'>
                  {donor.full_name}
                </td>
                <td className='border border-gray-400 p-2'>{donor.email}</td>
                <td className='border border-gray-400 p-2'>{donor.username}</td>
                <td className='border border-gray-400 p-2'>{donor.contact}</td>
                <td className='border border-gray-400 p-2'>
                  {donor.organization}
                </td>
                <td className='border border-gray-400 p-2'>
                  <span
                    className={`ml-2 bg-slate-100 rounded-full px-2 py-1 capitalize ${
                      donor.status === "pending"
                        ? "text-blue-300"
                        : donor.status === "approved"
                        ? "text-green-500"
                        : donor.status === "rejected" && "text-red-400"
                    }`}
                  >
                    {donor.status}
                  </span>
                </td>
                <td className='flex gap-1 border-b border-gray-400 p-2'>
                  <button
                    className='bg-blue-300 text-white rounded px-2 py-1 text-xs'
                    onClick={() => handleDonorStatus(donor.id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className='bg-red-300 text-white rounded px-2 py-1 text-xs'
                    onClick={() => handleDonorStatus(donor.id, "disapprove")}
                  >
                    Disapprove
                  </button>
                  <button
                    className='bg-red-500 text-white rounded px-2 py-1 text-xs'
                    onClick={() => handleDeleteUser(donor.user)}
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
};

export default DonorsPage;
