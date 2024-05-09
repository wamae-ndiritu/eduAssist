import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFinancialRequestDetails } from "../../redux/actions/requestAction";

const FinancialRequestDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const requestId = params.id;

  const { financialRequest, loading, error } = useSelector(
    (state) => state.request
  );

  const calculateAge = (birthday) => {
  const dob = new Date(birthday);
  const now = new Date();

  let years = now.getFullYear() - dob.getFullYear();
  const months = now.getMonth() - dob.getMonth();
  const days = now.getDate() - dob.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
  }

  return years;
};

  useEffect(() => {
    dispatch(getFinancialRequestDetails(requestId));
  }, [dispatch, requestId]);

  console.log(financialRequest);
  return (
    <section className='w-full border p-4'>
      <h3 className='text-lg text-gray-600 capitalize mt-5'>
        Student Information
      </h3>
      <div className='flex items-end gap-5'>
        <img
          src={
            financialRequest.profile_pic
              ? financialRequest.profile_pic
              : "/profile-icon.jpeg"
          }
          alt={financialRequest.full_name}
          className='h-54 w-64 object-cover border'
        />
        <section className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='col-span-1 text-gray-600'>
            <div className='flex gap-1 items-center mb-1'>
              <h6>Name:</h6>
              <span className='font-semibold'>
                {financialRequest.full_name}
              </span>
            </div>
            <div className='flex gap-1 items-center mb-1'>
              <h6>Email:</h6>
              <a
                href={`mailto:${financialRequest.email}`}
                className='font-semibold text-blue-500 underline'
              >
                {financialRequest.email}
              </a>
            </div>
            <div className='flex gap-1 items-center mb-1'>
              <h6>Age:</h6>
              <span className='font-semibold'>
                {calculateAge(financialRequest.date_of_birth)}
              </span>
            </div>
            <div className='flex gap-1 items-center mb-1'>
              <h6>Address: </h6>
              <span className='font-semibold capitalize text-md'>
                {financialRequest.address + ", " + financialRequest.city}
              </span>
            </div>
            <div className='flex gap-1 items-center mb-1'>
              <h6>Location: </h6>
              <span className='font-semibold capitalize text-md'>
                {financialRequest.location}
              </span>
            </div>
          </div>
          <div className='col-span-1 text-gray-600'>
            <h6 className='font-semibold'>Education</h6>
            <div className='flex gap-1 items-center mb-1'>
              <h6>Institution:</h6>
              <span className='font-semibold capitalize text-md'>
                {financialRequest.institution_name}
              </span>
            </div>
            <div className='flex gap-1 items-center mb-1'>
              <h6>Course:</h6>
              <span className='font-semibold capitalize'>
                {financialRequest.course_name}
              </span>
            </div>
            <div className='flex gap-1 items-center mb-1'>
              <h6>Education Level:</h6>
              <span className='font-semibold capitalize'>
                {financialRequest.education_level}
              </span>
            </div>
            <div className='flex gap-1 items-center mb-1'>
              <h6>Current Year:</h6>
              <span className='font-semibold capitalize'>
                {financialRequest.expected_graduation -
                  financialRequest.year_joined}
              </span>
            </div>
          </div>
        </section>
      </div>
      <h3 className='text-lg text-gray-600 capitalize mt-5'>
        Reason for Financial Aid
      </h3>
      <p className='py-1 text-gray-600'>{financialRequest.reason_for_aid}</p>
      <h3 className='text-lg text-gray-600 capitalize mt-5'>
        Additional Information
      </h3>
      <table className='border border-gray-300 mt-4 text-gray-600'>
        <thead>
          <tr>
            <td className='border border-gray-300 px-2 py-1'>Part</td>
            <td className='border border-gray-300 px-2 py-1'>Yes/No</td>
            <td className='border border-gray-300 px-2 py-1'>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-gray-300 px-2 py-1'>
              Do you suffer from any physical impairment (disability)? If yes,
              please provide details.
            </td>

            <td className='border border-gray-300 px-2 py-1'>
              {financialRequest.is_disabled ? "Yes" : "No"}
            </td>
            <td className='border border-gray-300 px-2 py-1'>
              {financialRequest.is_disabled
                ? financialRequest.disability_description
                : "No disability"}
            </td>
          </tr>
          <tr>
            <td className='border border-gray-300 px-2 py-1'>
              Do your parents/gurdians have any form physical impairment
              (disability)? If yes, please provide details.
            </td>

            <td className='border border-gray-300 px-2 py-1'>
              {financialRequest.is_parent_disabled ? "Yes" : "No"}
            </td>
            <td className='border border-gray-300 px-2 py-1'>
              {financialRequest.is_disabled
                ? financialRequest.parent_disability_description
                : "No disability"}
            </td>
          </tr>
          <tr>
            <td className='border border-gray-300 px-2 py-1'>
              Why has been the main source of your funding in education for the
              past?
            </td>

            <td className='border border-gray-300 px-2 py-1'>Not required</td>
            <td className='border border-gray-300 px-2 py-1'>
              {financialRequest.funding_source}
            </td>
          </tr>
        </tbody>
      </table>
      <h3 className='text-lg text-gray-600 capitalize mt-5 mb-2'>
        Identification/Supporting Documents
      </h3>
      <section className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='col-span-1 h-96 border flex flex-col gap-3 items-center justify-center'>
          <img
            src={financialRequest.national_id_url}
            alt='National ID'
            className='h-full w-full object-contain'
          />
          <h6 className='text-gray-600'>National ID/Birth Certificate</h6>
        </div>
        <div className='col-span-1 h-96 border flex flex-col gap-3 items-center justify-center'>
          <img
            src={financialRequest.kcpe_certificate_url}
            alt='KCPE Cert.'
            className='h-full w-full object-contain'
          />
          <h6 className='text-gray-600'>KCPE Certificate</h6>
        </div>
        <div className='col-span-1 h-96 border flex flex-col gap-3 items-center justify-center'>
          <img
            src={financialRequest.kcse_certificate_url}
            alt='KCSE Cert.'
            className='h-full w-full object-contain'
          />
          <h6 className='text-gray-600'>KCSE Certificate</h6>
        </div>
        <div className='col-span-1 h-96 border flex flex-col gap-3 items-center justify-center'>
          <img
            src={financialRequest.transcript}
            alt='Transcript'
            className='h-full w-full object-contain'
          />
          <h6 className='text-gray-600'>Fee Structure</h6>
        </div>
        <div className='col-span-1 h-96 border flex flex-col gap-3 items-center justify-center'>
          <img
            src={financialRequest.fee_structure}
            alt='Fees Structure'
            className='h-full w-full object-contain'
          />
          <h6 className='text-gray-600'>Fee Structure</h6>
        </div>
        <div className='col-span-1 h-96 border flex flex-col gap-3 items-center justify-center'>
          <img
            src={financialRequest.fee_statement}
            alt='Fees Statement'
            className='h-full w-full object-contain'
          />
          <h6 className='text-gray-600'>Fee Statement</h6>
        </div>
      </section>
    </section>
  );
};

export default FinancialRequestDetails;