import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Message from "./utils/Message";
import app from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { resetReqState } from "../redux/slices/requestSlices";
import { createFinancialRequest } from "../redux/actions/requestAction";
import { useNavigate } from "react-router";

function ApplicationFeatures() {
  const bucket_url = import.meta.env.VITE_APP_BUCKET_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.request);

  const [feesStructure, setFeesStructure] = useState(null);
  const [feesStatement, setFeesStatement] = useState(null);
  const [results, setResults] = useState(null);
  const [familyBackground, setFamilityBackground] = useState(null);
  const [currentFeeStructure, setCurrentFeeStructure] = useState({});
  const [currentFeeStatement, setCurrentFeeStatement] = useState({});
  const [currentTrascript, setCurrentTranscript] = useState({});
  const [document3, setDocument3] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isParentDisabled, setIsParentDisabled] = useState(false);
  const [isOrphan, setIsOrphan] = useState(false);
  const [uploadErr, setUploadErr] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [urls, setUrls] = useState({});
  const [requestInfo, setRequestInfo] = useState({
    reason_for_aid: "",
    disability_description: "",
    parent_disability_description: "",
    funding_source: "",
  });

    const [checkboxes, setCheckboxes] = useState({
      scholarships: false,
      bursary: false,
      well_wishers: false,
      others: true,
    });

    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setCheckboxes((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    };

  const handleRequestInfoChange = (e) => {
    setRequestInfo({ ...requestInfo, [e.target.name]: e.target.value });
  };

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
      proof_of_background: document3,
    };
    if (!feesStatement || !feesStructure || !results || !familyBackground) {
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
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setUrls({ ...urls, [key]: downloadURL });
          });
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
        setUploadErr("Error uploading files!");
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    await uploadImages();
    console.log({
      ...requestInfo,
      is_disabled: isDisabled,
      is_parent_disabled: isParentDisabled,
      is_orphan: isOrphan,
      ...checkboxes,
      ...urls,
    });
  };

  useEffect(() => {
    if (urls.length === 4) {
      dispatch(
        createFinancialRequest({
          ...requestInfo,
          is_disabled: isDisabled,
          is_parent_disabled: isParentDisabled,
          is_orphan: isOrphan,
          ...checkboxes,
          ...urls,
        })
      );
      setUrls([]);
    }
  }, [dispatch, urls, isParentDisabled, isDisabled, requestInfo, isOrphan, checkboxes]);

  useEffect(() => {
    if (success) {
      navigate(`/profile/applications`);
    }
  }, [navigate, success]);

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        error && (
          <Message onClose={() => dispatch(resetReqState())}>{error}</Message>
        )
      )}
      <h2 className='text-green-500 mt-4 text-xl'>Answer all the questions.</h2>
      <ul className='list-decimal'>
        <li className='flex flex-col mb-2 mt-4'>
          <h6 className='text-gray-600'>
            Why are you applying for financial assistance? (In not less that 100
            words)
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
          <h6 className='text-gray-600'>Are you an orphan?</h6>
          <p className='text-orange-300 text-sm'>
            If you&apos;re an orphan, you&apos;ll be required to provide the
            death certificate, and if not an orphan, please provide a photo
            showing your background including your parents.
          </p>
          <div className='flex gap-10 my-2'>
            <div className='flex gap-3 items-center'>
              <input
                id='orphan_yes'
                type='radio'
                name='is_orphan'
                className='h-6 w-6'
                value='yes'
                onChange={(e) => setIsOrphan(e.target.value === "yes")}
              />
              <label htmlFor='orphan_yes'>Yes</label>
            </div>
            <div className='flex gap-3 items-center'>
              <input
                type='radio'
                name='is_orphan'
                id='orphan_no'
                className='h-6 w-6'
                value='no'
                onChange={(e) => setIsOrphan(e.target.value === "yes")}
              />
              <label htmlFor='orphan_no'>No</label>
            </div>
          </div>
        </li>
        <li className='flex flex-col my-2'>
          <h6 className='text-gray-600'>
            Do you suffer from any physical impairment (disability)?
          </h6>
          <p className='text-orange-300 text-sm'>
            If yes, you&apos;ll be required to provide disability details.
          </p>
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
            Do your parents/guardians have any form physical impairment
            (disability)?
          </h6>
          <p className='text-orange-300 text-sm'>
            If yes, you&apos;ll be required to provide disability details.
          </p>
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
            What has been the main source of your funding in education for the
            past?
          </h6>
          <div className='flex gap-3 items-center text-gray-600 mb-2'>
            <input
              type='checkbox'
              id='scholarships'
              name='scholarships'
              checked={checkboxes.scholarships}
              onChange={handleCheckboxChange}
              className='h-6 w-6'
            />
            <label htmlFor='scholarships' className='my-auto text-lg'>
              Scholarships
            </label>
          </div>
          <div className='flex gap-3 items-center text-gray-600 mb-2'>
            <input
              type='checkbox'
              id='bursary'
              name='bursary'
              checked={checkboxes.bursary}
              onChange={handleCheckboxChange}
              className='h-6 w-6'
            />
            <label htmlFor='bursary' className='my-auto text-lg'>
              Bursary
            </label>
          </div>
          <div className='flex gap-3 items-center text-gray-600 mb-2'>
            <input
              type='checkbox'
              id='well_wishers'
              name='well_wishers'
              checked={checkboxes.well_wishers}
              onChange={handleCheckboxChange}
              className='h-6 w-6'
            />
            <label htmlFor='well_wishers' className='my-auto text-lg'>
              Well Wishers
            </label>
          </div>
          <div className='flex gap-3 items-center text-gray-600 mb-2'>
            <input
              type='checkbox'
              id='others'
              name='others'
              checked={checkboxes.others}
              onChange={handleCheckboxChange}
              className='h-6 w-6'
            />
            <label htmlFor='others' className='my-auto text-lg'>
              Others
            </label>
            <p className='text-orange-300 text-sm'>
              If others, you&apos;ll be required to provide details.
            </p>
          </div>
          {checkboxes.others && (
            <input
              type='text'
              className='text-gray-600 border-b border-gray-300 py-1 focus:outline-none'
              name='funding_source'
              onChange={handleRequestInfoChange}
              value={requestInfo.funding_source}
              placeholder='If others, give details'
            />
          )}
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
        {/* Death Certificate/Backgroung photo */}
        <div className='mb-4 bg-gray-100 rounded p-1 h-72 w-60 flex flex-col justify-center items-center p-4'>
          <section className='rounded bg-gray-200 h-full w-full flex justify-center items-center'>
            {familyBackground ? (
              <img
                src={familyBackground}
                alt='Transcript'
                className='w-full h-full object-cover'
              />
            ) : (
              <p className='text-center px-8'>
                Death Certificate{" "}
                <span className='text-xs text-red-300'>(If orphan)</span> or
                Background Photo{" "}
                <span className='text-xs text-red-300'>
                  (If not orphan. photo should include the parents)
                </span>
              </p>
            )}
            <input
              type='file'
              accept='.jpg, .jpeg, .png'
              className='hidden'
              id='familyBackground'
              onChange={(e) =>
                handleFileChange(e, setDocument3, setFamilityBackground)
              }
            />
          </section>
          <label
            htmlFor='familyBackground'
            className='text-blue-600 text-sm hover:text-blue-800 cursor-pointer block text-center'
          >
            Upload Death Certificate or Background Photo
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
