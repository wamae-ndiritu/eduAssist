import React from "react";
import { ProfileHead } from "../components/Profile";
import Navbar from "../components/Navbar";
import DocumentUpload from "../components/utils/DocumentUpload";
import ApplicationFeatures from "../components/ApplicationFeatures";

const NewApplicationPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="w-full bg-white my-12 flex flex-col items-center justify-center">
        <section className="w-full md:w-4/5 px-4 md:px-12 py-4 border flex flex-col items-center">
          <h1 className="text-3xl font-semibold my-5">Create Application</h1>
          <ProfileHead />
          <h6>New Application Page</h6>
          <section className="flex">
            <ApplicationFeatures />
          </section>
        </section>
      </div>
    </React.Fragment>
  );
};

export default NewApplicationPage;
