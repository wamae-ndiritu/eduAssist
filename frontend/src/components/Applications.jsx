import { useSelector } from "react-redux";

const Applications = () => {
  const { financialRequests } = useSelector((state) => state.request);
  return (
    <div className='w-full'>
      {financialRequests.map((requestItem) => {
        return (
          <div className='w-full my-2 border p-4' key={requestItem.id}>
            <span className='flex gap-3 justify-end'>
              <h6 className='bg-green-500 text-white px-4 py-1 rounded'>
                Approved
              </h6>
              <h6 className='bg-slate-200  text-green-500 px-4 py-1 rounded'>
                5th Apr 2024 12:04PM
              </h6>
              <button className='bg-black text-white px-4 py-1 rounded'>
                View
              </button>
            </span>
            <div>
              <h6 className='text-gray-600 text-normal'>Application details</h6>
              <h6 className='text-gray-900 font-semibold my-1'>
                Reason for financial aid request
              </h6>
              <p className='text-gray-600 text-md'>
                {requestItem.reason_for_aid}
              </p>
              {requestItem.is_disabled && (
                <>
                  <h6 className='text-gray-900 font-semibold my-1'>
                    Disability
                  </h6>
                  <p className='text-gray-600 text-md'>
                    {requestItem.disability_description}
                  </p>
                </>
              )}
              {requestItem.is_parent_disabled && (
                <>
                  <h6 className='text-gray-900 font-semibold my-1'>
                    Parent Disability
                  </h6>
                  <p className='text-gray-600 text-md'>
                    {requestItem.parent_disability_description}
                  </p>
                </>
              )}
            </div>
            <span className='text-sm text-gray-600'>5 Reviews</span>
          </div>
        );
      })}
    </div>
  );
};
export default Applications;
