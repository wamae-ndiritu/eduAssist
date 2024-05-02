import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { ProfileHead } from "../components/Profile";
import Applications from "../components/Applications";
import { useDispatch } from "react-redux";
import { getFinancialRequests } from "../redux/actions/requestAction";

const ApplicationsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFinancialRequests())
  }, [dispatch])

  return (
    <React.Fragment>
      <Navbar />
      <div className="w-full bg-white my-12 flex flex-cols items-center justify-center">
        <section className="w-full md:w-4/5 px-4 md:px-12 py-4 border flex flex-col items-center">
          <h1 className="text-3xl font-semibold my-5">My Applications</h1>
          <ProfileHead />
          <Applications />
        </section>
      </div>
    </React.Fragment>
  );
};

export default ApplicationsPage;
