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

  useEffect(() => {
    dispatch(getFinancialRequestDetails(requestId));
  }, [dispatch, requestId]);

  console.log(financialRequest);
  return <div>FinancialRequestDetails</div>;
};

export default FinancialRequestDetails;
