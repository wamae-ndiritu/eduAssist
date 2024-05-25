import React from "react";
import { ProfileHead } from "../components/Profile";
import Navbar from "../components/Navbar";
import ApplicationFeatures from "../components/ApplicationFeatures";

const NewApplicationPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="w-full bg-white my-12 flex flex-col items-center justify-center">
        <section className="w-full md:w-4/5 px-4 md:px-12 py-4 border flex flex-col">
          <h1 className="text-2xl font-semibold mt-1 mb-3">Create New Financial Aid Request</h1>
          <ProfileHead />
          <section className="flex">
            <ApplicationFeatures />
          </section>
        </section>
      </div>
    </React.Fragment>
  );
};

export default NewApplicationPage;
