import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import Message from "./Message";
import { validateObject } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/actions/userActions";

function DocumentUpload() {
  const bucket_url = import.meta.env.VITE_APP_BUCKET_URL;

  const dispatch = useDispatch();
  const [files, setFiles] = useState({
    national_id: "",
    KCPE_certificate: "",
    KCSE_certificate: "",
  });
  const [nationalID, setNationalID] = useState(null);
  const [kcpe, setKcpe] = useState(null);
  const [ksce, setKCSE] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadErr, setUploadErr] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

   const { profileInfo } = useSelector(
     (state) => state.user
   );

  const uploadImages = () => {
    setUploading(true);
    const emptyKey = validateObject(files);
    if (emptyKey) {
      setUploadErr(`Please upload all documents!`);
      setUploading(false);
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
            const newObj = (urls[key] = downloadURL);
            setUrls((prevState) => [...prevState, newObj]);
          });
        }
      );
    }
    return Promise.all(promises)
      .then(() => {
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
        setUploadErr("Error uploading files!");
        console.log(err);
      });
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    setFiles({ ...files, [e.target.name]: file });
    const reader = new FileReader();
    reader.onload = (event) => {
      setter(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDocumentsSave = async () => {
    await uploadImages();
  };

  useEffect(() => {
    if (urls.length === 3){
       dispatch(
         updateProfile("documents", {
           national_id: urls[0],
           KCPE_certificate: urls[1],
           KCSE_certificate: urls[2],
         })
       );
       setUrls([]);
    }
  }, [dispatch, urls])

  useEffect(() => {
    if (profileInfo?.documents_updated){
      setIsUploaded(true);
    }
  }, [profileInfo])

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Upload Documents</h2>
        {isUploaded ? (
          <button
            className='bg-green-500 px-2 py-1 rounded text-white'
            onClick={() => setIsUploaded(false)}
          >
            Update Documents
          </button>
        ) : (
          profileInfo?.documents_updated && (
            <button
              className='bg-gray-200 px-2 py-1 rounded text-black'
              onClick={() => setIsUploaded(true)}
            >
              View updated docs
            </button>
          )
        )}
      </div>
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
      {isUploaded ? (
        <section className='grid md:grid-cols-3 gap-5'>
          <div className='col-span-1 p-2'>
            <img
              src={profileInfo?.national_id_url}
              alt='National ID/Birth Cert'
              className='w-full h-full object-cover'
            />
            <p className='text-center px-8 text-gray-600 my-2'>
              National ID/Birth Cert.
            </p>
          </div>
          <div className='col-span-1 p-2'>
            <img
              src={profileInfo?.kcpe_certificate_url}
              alt='KCPE Cert'
              className='w-full h-full object-cover'
            />
            <p className='text-center px-8 text-gray-600 my-2'>KCPE Cert.</p>
          </div>
          <div className='col-span-1 p-2'>
            <img
              src={profileInfo?.kcse_certificate_url}
              alt='KCSE Cert'
              className='w-full h-full object-cover'
            />
            <p className='text-center px-8 text-gray-600 my-2'>KCSE Cert.</p>
          </div>
        </section>
      ) : (
        <>
          <div className='my-2 flex justify-end'>
            <button
              className='bg-green-500 text-white px-4 py-1 rounded'
              onClick={handleDocumentsSave}
            >
              Upload
            </button>
          </div>
          <div className='flex gap-5 my-6'>
            {/* Fees Structure Section */}
            <div className='mb-8 bg-gray-100 rounded p-1 h-72 w-60 flex flex-col justify-center items-center p-4'>
              <section className='bg-gray-200 h-full w-full flex justify-center items-center'>
                {nationalID ? (
                  <img
                    src={nationalID}
                    alt='National ID/Birth Cert'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <p className='text-center px-8'>National ID/Birth Cert.</p>
                )}
                <input
                  type='file'
                  accept='.jpg, .jpeg, .png'
                  className='hidden'
                  id='feesStructureInput'
                  onChange={(e) => handleFileChange(e, setNationalID)}
                  name='national_id'
                />
              </section>
              <label
                htmlFor='feesStructureInput'
                className='text-blue-600 hover:text-blue-800 cursor-pointer block text-center'
              >
                Upload National ID
              </label>
            </div>

            {/* Fees Statement Section */}
            <div className='mb-8 bg-gray-100 rounded p-1 h-72 w-60 flex flex-col justify-center items-center p-4'>
              <section className='bg-gray-200 h-full w-full flex justify-center items-center'>
                {kcpe ? (
                  <img
                    src={kcpe}
                    alt='KCPE Cert.'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <p className='text-center px-8'>KCPE Cert.</p>
                )}
                <input
                  type='file'
                  accept='.jpg, .jpeg, .png'
                  className='hidden'
                  id='feesStatementInput'
                  onChange={(e) => handleFileChange(e, setKcpe)}
                  name='KCPE_certificate'
                />
              </section>
              <label
                htmlFor='feesStatementInput'
                className='text-blue-600 hover:text-blue-800 cursor-pointer block text-center'
              >
                Upload KCPE Cert.
              </label>
            </div>

            {/* Results Section */}
            <div className='mb-4 bg-gray-100 rounded p-1 h-72 w-60 flex flex-col justify-center items-center p-4'>
              <section className='rounded bg-gray-200 h-full w-full flex justify-center items-center'>
                {ksce ? (
                  <img
                    src={ksce}
                    alt='KCSE Cert'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <p className='text-center px-8'>KSCE Cert.</p>
                )}
                <input
                  type='file'
                  accept='.jpg, .jpeg, .png'
                  className='hidden'
                  id='resultsInput'
                  onChange={(e) => handleFileChange(e, setKCSE)}
                  name='KCSE_certificate'
                />
              </section>
              <label
                htmlFor='resultsInput'
                className='text-blue-600 hover:text-blue-800 cursor-pointer block text-center'
              >
                Upload KCSE Cert.
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DocumentUpload;
