import { useSelector } from "react-redux";
import RequestCard from "./donorsComponents/RequestCard";

const Applications = () => {
  const { financialRequests } = useSelector((state) => state.request);
  return (
    <div className='w-full'>
      {financialRequests.map((request) => {
        return <RequestCard info={request} />;
      })}
    </div>
  );
};
export default Applications;
