import { useState } from "react";
import { validateObject } from "../helpers";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Message from "./utils/Message";
import app from "../firebase";

function ApplicationFeatures() {
  const bucket_url = import.meta.env.VITE_APP_BUCKET_URL;
  const [feesStructure, setFeesStructure] = useState(null);
  const [feesStatement, setFeesStatement] = useState(null);
  const [results, setResults] = useState(null);
  const [currentFeeStructure, setCurrentFeeStructure] = useState({});
  const [currentFeeStatement, setCurrentFeeStatement] = useState({});
  const [currentTrascript, setCurrentTranscript] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isParentDisabled, setIsParentDisabled] = useState(false);
  const [uploadErr, setUploadErr] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [requestInfo, setRequestInfo] = useState({
    reason_for_aid: '',
    disability_description: '',
    parent_disability_description: '',
    funding_source: '',
  })

  const handleRequestInfoChange = (e) => {
    setRequestInfo({...requestInfo, [e.target.name]: e.target.value})
  }

  const handleFileChange = (e, setter, setterFile) => {
    const file = e.target.files[0];
    setterFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setter(event.target.result);
    };
    reader.readAsDataURL(file);
  };


    const uploadImages = () => {
      setUploading(true);
      const files = {
        fee_structure: currentFeeStructure,
        fee_statement: currentFeeStatement,
        transcript: currentTrascript,
      };
      if (!feesStatement || !feesStructure || !results) {
        setUploadErr(`Please upload all documents!`);
        return;
      }
      const promises = [];
      for (const key in files) {
        const fileName = new Date().getTime() + files[key].name;
        const storage = getStorage(app, bucket_url);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, files[key]);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
            setUploadErr(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                const newObj = urls[key] = downloadURL;
                setUrls((prevState) => [...prevState, newObj]);
              }
            );
          }
        );
      }
      return Promise.all(promises)
        .then(() => {
          setUploading(false);
          console.log("Upload done!");
        })
        .catch((err) => {
          setUploading(false);
          setUploadErr("Error uploading files!")
          console.log(err);
        });
    };

  const handleSubmit = async () => {
    await uploadImages()
    console.log({...requestInfo, isDisabled, isParentDisabled})
  }

  console.log(uploadErr)
  console.log(urls)

  return (
    <div className='max-w-4xl mx-auto'>
      {uploadErr && (
        <Message onClose={() => setUploadErr(null)}>{uploadErr}</Message>
      )}
      {progress > 0 && (
        <Message variant='success' onClose={() => setProgress(0)}>
          {progress}% uploaded...
        </Message>
      )}
      {uploading && (
        <Message variant='success' onClose={() => setUploading(false)}>
           uploading...
        </Message>
      )}
      <ul className='list-decimal'>
        <li className='flex flex-col mb-2 mt-4'>
          <h6 className='text-gray-600'>
            Why are you applying for financial assistance?
          </h6>
          <input
            type='text'
            className='text-gray-600 border-b border-gray-300 py-1 focus:outline-none'
            name='reason_for_aid'
            onChange={handleRequestInfoChange}
            value={requestInfo.reason_for_aid}
          />
        </li>
        <li className='flex flex-col my-2'>
          <h6 className='text-gray-600'>
            Do you suffer from any physical impairment (disability)? If yes,
            please provide details.
          </h6>
          <div className='flex gap-10 my-2'>
            <div className='flex gap-3 items-center'>
              <input
                id='disability_yes'
                type='radio'
                name='disability'
                className='h-6 w-6'
                value='yes'
                onChange={(e) => setIsDisabled(e.target.value === "yes")}
              />
              <label htmlFor='disability_yes'>Yes</label>
            </div>
            <div className='flex gap-3 items-center'>
              <input
                type='radio'
                name='disability'
                id='disability_no'
                className='h-6 w-6'
                value='no'
                onChange={(e) => setIsDisabled(e.target.value === "yes")}
              />
              <label htmlFor='disability_no'>No</label>
            </div>
          </div>
          <input
            type='text'
            className='text-gray-600 border-b border-gray-300 py-1 focus:outline-none'
            name='disability_description'
            onChange={handleRequestInfoChange}
            value={requestInfo.disability_description}
          />
        </li>
        <li className='flex flex-col my-2'>
          <h6 className='text-gray-600'>
            Do your parents/gurdians have any form physical impairment
            (disability)? If yes, please provide details.
          </h6>
          <div className='flex gap-10 my-2'>
            <div className='flex gap-3 items-center'>
              <input
                id='parent_disability_yes'
                type='radio'
                name='parent_disability'
                className='h-6 w-6'
                value='yes'
                onChange={(e) => setIsParentDisabled(e.target.value === "yes")}
              />
              <label htmlFor='parent_disability_yes'>Yes</label>
            </div>
            <div className='flex gap-3 items-center'>
              <input
                type='radio'
                name='parent_disability'
                id='parent_disability_no'
                className='h-6 w-6'
                value='no'
                onChange={(e) => setIsParentDisabled(e.target.value === "yes")}
              />
              <label htmlFor='parent_disability_no'>No</label>
            </div>
          </div>
          <input
            type='text'
            className='text-gray-600 border-b border-gray-300 py-1 focus:outline-none'
            name='parent_disability_description'
            onChange={handleRequestInfoChange}
            value={requestInfo.parent_disability_description}
          />
        </li>
        <li className='flex flex-col mb-2 mt-4'>
          <h6 className='text-gray-600'>
            Why has been the main source of your funding in education for the
            past?
          </h6>
          <input
            type='text'
            className='text-gray-600 border-b border-gray-300 py-1 focus:outline-none'
            name='funding_source'
            onChange={handleRequestInfoChange}
            value={requestInfo.funding_source}
          />
        </li>
      </ul>
      <h6 className=' mt-6 text-gray-600'>
        Please provide supporting documents
      </h6>
      <div className='flex gap-5 my-6'>
        {/* Fees Structure Section */}
        <div className='mb-8 bg-gray-100 rounded p-1 h-72 w-60 flex flex-col justify-center items-center p-4'>
          <section className='bg-gray-200 h-full w-full flex justify-center items-center'>
            {feesStructure ? (
              <img
                src={feesStructure}
                alt='Fee Structure'
                className='w-full h-full object-cover'
              />
            ) : (
              <p className='text-center px-8'>Academic Fees Structure</p>
            )}
            <input
              type='file'
              accept='.jpg, .jpeg, .png'
              className='hidden'
              id='feesStructureInput'
              onChange={(e) =>
                handleFileChange(e, setFeesStructure, setCurrentFeeStructure)
              }
            />
          </section>
          <label
            htmlFor='feesStructureInput'
            className='text-blue-600 hover:text-blue-800 cursor-pointer block text-center'
          >
            Upload Fees Structure
          </label>
        </div>

        {/* Fees Statement Section */}
        <div className='mb-8 bg-gray-100 rounded p-1 h-72 w-60 flex flex-col justify-center items-center p-4'>
          <section className='bg-gray-200 h-full w-full flex justify-center items-center'>
            {feesStatement ? (
              <img
                src={feesStatement}
                alt='Fee Statement'
                className='w-full h-full object-cover'
              />
            ) : (
              <p className='text-center px-8'>Current Fees Statement</p>
            )}
            <input
              type='file'
              accept='.jpg, .jpeg, .png'
              className='hidden'
              id='feesStatementInput'
              onChange={(e) =>
                handleFileChange(e, setFeesStatement, setCurrentFeeStatement)
              }
            />
          </section>
          <label
            htmlFor='feesStatementInput'
            className='text-blue-600 hover:text-blue-800 cursor-pointer block text-center'
          >
            Upload Fees Statement
          </label>
        </div>

        {/* Results Section */}
        <div className='mb-4 bg-gray-100 rounded p-1 h-72 w-60 flex flex-col justify-center items-center p-4'>
          <section className='rounded bg-gray-200 h-full w-full flex justify-center items-center'>
            {results ? (
              <img
                src={results}
                alt='Transcript'
                className='w-full h-full object-cover'
              />
            ) : (
              <p className='text-center px-8'>Current Year Transcript</p>
            )}
            <input
              type='file'
              accept='.jpg, .jpeg, .png'
              className='hidden'
              id='resultsInput'
              onChange={(e) =>
                handleFileChange(e, setResults, setCurrentTranscript)
              }
            />
          </section>
          <label
            htmlFor='resultsInput'
            className='text-blue-600 hover:text-blue-800 cursor-pointer block text-center'
          >
            Upload Results
          </label>
        </div>
      </div>
      <button
        className='bg-emerald-800 p-4 rounded text-white'
        onClick={handleSubmit}
      >
        Submit Application
      </button>
    </div>
  );
}

export default ApplicationFeatures;
