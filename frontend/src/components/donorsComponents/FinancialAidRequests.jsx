import GroupIcon from "@mui/icons-material/Group";
import RateReviewIcon from "@mui/icons-material/RateReview";
import RecommendIcon from "@mui/icons-material/Recommend";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import RequestCard from "./RequestCard";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getFinancialRequests } from "../../redux/actions/requestAction";
const FinancialAidRequests = () => {
   const dispatch = useDispatch();

   const { financialRequests } = useSelector((state) => state.request);

   useEffect(() => {
     dispatch(getFinancialRequests());
   }, [dispatch]);
  return (
    <div>
      <section className='w-full grid grid-cols-1 md:grid-cols-4 gap-3'>
        <div className='col-span-1 shadow bg-green-600 text-white rounded p-4 flex gap-3'>
          <span className=''>
            <GroupIcon style={{ fontSize: "50px" }} />
          </span>
          <span>
            <h4 className='text-xl'>Total Students</h4>
            <p>200</p>
          </span>
        </div>
        <div className='col-span-1 shadow bg-green-500 text-white rounded p-4 flex gap-3'>
          <span className=''>
            <RequestQuoteIcon style={{ fontSize: "50px" }} />
          </span>
          <span>
            <h4 className='text-xl'>Total Requests</h4>
            <p>30</p>
          </span>
        </div>
        <div className='col-span-1 shadow bg-green-600 text-white rounded p-4 flex gap-3'>
          <span className=''>
            <RateReviewIcon style={{ fontSize: "50px" }} />
          </span>
          <span>
            <h4>My Reviews</h4>
            <p>10</p>
          </span>
        </div>
        <div className='col-span-1 shadow bg-green-500 text-white rounded p-4 flex gap-3'>
          <span className=''>
            <RecommendIcon style={{ fontSize: "50px" }} />
          </span>
          <span>
            <h4>Total Donors</h4>
            <p>8</p>
          </span>
        </div>
      </section>
      <section className='w-full flex justify-between items-end'>
        <h2 className='mt-5 text-3xl font-semibold'>Requests</h2>
        <div className='mt-5 flex items-end gap-5'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='start_from'>From</label>
            <input
              type='date'
              name='start_from'
              className='border p-2 rounded'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='start_from'>From</label>
            <input
              type='date'
              name='start_from'
              className='border p-2 rounded'
            />
          </div>
          <button className='bg-green-600 px-4 py-2 text-white rounded'>
            Filter
          </button>
        </div>
      </section>
      <section className="my-5 flex flex-wrap gap-3">
        {
          financialRequests.map((request) => {
            return <RequestCard info={request }/>;
          })
        }
      </section>
    </div>
  );
};

export default FinancialAidRequests;
