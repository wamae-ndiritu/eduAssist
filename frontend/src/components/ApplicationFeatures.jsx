import React, { useState } from "react";

function ApplicationFeatures() {
  const [feesStructure, setFeesStructure] = useState(null);
  const [feesStatement, setFeesStatement] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setter(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-5 m-6">
        {/* Fees Structure Section */}
        <div className="mb-8 bg-gray-100 rounded p-1 h-72 w-60 flex flex-col justify-center items-center">
          <section className="m-4 mb-1 rounded bg-gray-200 h-52 w-48 flex justify-center items-center">
            {feesStructure ? (
              <iframe
                src={feesStructure}
                // className="w-full h-full object-cover"
                className="w-full h-48 rounded-lg mb-2"
              ></iframe>
            ) : (
              <p className="text-center">Fees Structure</p>
            )}
            <input
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              className="hidden"
              id="feesStructureInput"
              onChange={(e) => handleFileChange(e, setFeesStructure)}
            />
          </section>
          <label
            htmlFor="feesStructureInput"
            className="text-blue-600 hover:text-blue-800 cursor-pointer block text-center"
          >
            Upload Fees Structure
          </label>
        </div>

        {/* Fees Statement Section */}
        <div className="mb-8 bg-gray-100 rounded p-1 h-72 w-60 flex flex-col justify-center items-center">
          <section className="m-4 mb-1 rounded bg-gray-200 h-52 w-48 flex justify-center items-center">
            {feesStatement ? (
              <iframe
                src={feesStatement}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-center">Fees Statement</p>
            )}
            <input
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              className="hidden"
              id="feesStatementInput"
              onChange={(e) => handleFileChange(e, setFeesStatement)}
            />
          </section>
          <label
            htmlFor="feesStatementInput"
            className="text-blue-600 hover:text-blue-800 cursor-pointer block text-center"
          >
            Upload Fees Statement
          </label>
        </div>

        {/* Results Section */}
        <div className="mb-8 bg-gray-100 rounded p-1 h-72 w-60 flex flex-col justify-center items-center">
          <section className="m-4 mb-1 rounded bg-gray-200 h-52 w-48 flex justify-center items-center">
            {results ? (
              <iframe src={results} className="w-full h-full object-cover" />
            ) : (
              <p className="text-center">Results</p>
            )}
            <input
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              className="hidden"
              id="resultsInput"
              onChange={(e) => handleFileChange(e, setResults)}
            />
          </section>
          <label
            htmlFor="resultsInput"
            className="text-blue-600 hover:text-blue-800 cursor-pointer block text-center"
          >
            Upload Results
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-1xl flex justify-start font-semibold">
          Additional Iformation
        </h3>
        <textarea
          name=""
          id=""
          cols="80"
          rows="5"
          className="border outline-emerald-100 p-4 mt-2 mb-4"
        ></textarea>
        <button className="bg-emerald-400 p-4 w-48 rounded font-semibold hover:text-white">
          Submit
        </button>
      </div>
    </div>
  );
}

export default ApplicationFeatures;
