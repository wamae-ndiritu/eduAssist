import React from "react";
import { ProfileHead } from "../components/Profile";
import Navbar from "../components/Navbar";

const MessagesPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="w-full bg-white my-12 flex flex-cols items-center justify-center">
        <section className="w-full md:w-4/5 px-4 md:px-12 py-4 border flex flex-col items-center">
          <h1 className="text-3xl font-semibold my-5">Notifications</h1>
          <ProfileHead />
          <div className="w-full border m-4 p-3 ">
            <span className="flex  m-1 justify-between">
              <div>
                <h4>From: Andria Medina</h4>
                <h5>Resived on: 10 Apr 2024 1:47PM</h5>
              </div>
              <button className="bg-gray-200 px-4 py- rounded">
                Mark As Read
              </button>
            </span>
            <hr />
            <p className="m-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              iusto praesentium quo amet doloremque ut quas blanditiis minima
              corrupti minus mollitia eos consectetur tenetur pariatur
              temporibus, dolorem dolores fuga. Perspiciatis?
            </p>
            <span>
              <button className="bg-gray-200  px-4 rounded py-1 m-1">
                Reply
              </button>
            </span>
          </div>
          <div className="w-full border m-4 p-3 ">
            <span className="flex  m-1 justify-between">
              <div>
                <h4>From: John Doe</h4>
                <h5>Resived on: 10 Apr 2024 1:47PM</h5>
              </div>
              <button className="bg-gray-200 px-4 py- rounded">
                Mark As Read
              </button>
            </span>
            <hr />
            <p className="m-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              iusto praesentium quo amet doloremque ut quas blanditiis minima
              corrupti minus mollitia eos consectetur tenetur pariatur
              temporibus, dolorem dolores fuga. Perspiciatis?
            </p>
            <span>
              <button className="bg-gray-200  px-4 rounded py-1 m-1">
                Reply
              </button>
            </span>
          </div>
          <div className="w-full border m-4 p-3 ">
            <span className="flex  m-1 justify-between">
              <div>
                <h4>From: Walker Jonhs</h4>
                <h5>Resived on: 10 Apr 2024 1:47PM</h5>
              </div>
              <button className="bg-gray-200 px-4 py- rounded">
                Mark As Read
              </button>
            </span>
            <hr />
            <p className="m-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              iusto praesentium quo amet doloremque ut quas blanditiis minima
              corrupti minus mollitia eos consectetur tenetur pariatur
              temporibus, dolorem dolores fuga. Perspiciatis?
            </p>
            <span>
              <button className="bg-gray-200  px-4 rounded py-1 m-1">
                Reply
              </button>
            </span>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default MessagesPage;
