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
import * as pdfjs from "pdfjs-dist/build/pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  "/node_modules/pdfjs-dist/build/pdf.worker.mjs";
function DocumentUpload() {
  const bucket_url = import.meta.env.VITE_APP_BUCKET_URL;
  const [files, setFiles] = useState({
    national_id: null,
    KCPE_certificate: "",
    KCSE_certificate: "",
  });
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadErr, setUploadErr] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handleDocumentChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  console.log(urls);

  const uploadImages = (e) => {
    e.preventDefault();
    const emptyKey = validateObject(files);
    if (emptyKey){
      setUploadErr(`Please upload all documents!`)
      return;
    }
    console.log(files);
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
            setUrls((prevState) => [...prevState, { key: downloadURL }]);
          });
        }
      );
    }
    Promise.all(promises)
      .then(() => console.log("Upload done!"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const loadPdf = async (pdfUrl) => {
      console.log(pdfUrl)
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/fetch-pdf/?pdfUrl=${encodeURIComponent(pdfUrl)}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const loadingTask = pdfjs.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext);
        const imageUrl = canvas.toDataURL();
        setPreviewUrl(imageUrl);
        setFileName(pdfUrl.substring(pdfUrl.lastIndexOf("/") + 1));
      } catch (error) {
        console.error("Error loading PDF:", error);
        // Handle error
      }
    };
    if (urls.length) {
      loadPdf(urls[0].key);
    }
  }, [urls]);

  console.log(urls);
  console.log(previewUrl);
  console.log(fileName);

  const loadPdf = async (pdfUrl) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/fetch-pdf/?pdfUrl=${encodeURIComponent(
          pdfUrl
        )}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch PDF: ${response.status} ${response.statusText}`
        );
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url); // Assuming setPreviewUrl is a function to set the URL for preview
      setFileName(pdfUrl.substring(pdfUrl.lastIndexOf("/") + 1)); // Assuming setFileName is a function to set the file name
    } catch (error) {
      console.error("Error loading PDF:", error);
      // Handle error (e.g., display error message to the user)
    }
  };


  // loadPdf(
  //   "https://firebasestorage.googleapis.com/v0/b/shangilia.appspot.com/o/1714021352347_Assets_docs_Ndiritu_Wamae_CV%20(1).pdf?alt=media&token=c026f506-a34e-4a69-a9bf-ca8161d5e099"
  // );

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h2 className='text-2xl font-bold'>Upload Documents</h2>
      {uploadErr && (
        <Message onClose={() => setUploadErr(null)}>{uploadErr}</Message>
      )}
      {progress > 0 && (
        <Message variant='success' onClose={() => setProgress(0)}>
          {progress}% uploaded...
        </Message>
      )}
      <div className='my-2 flex justify-end'>
        <button
          className='bg-green-500 text-white px-4 py-1 rounded'
          onClick={uploadImages}
        >
          Upload
        </button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='bg-gray-100 p-2 rounded-lg'>
          {previewUrl ? (
            <div>
              <img
                src={previewUrl}
                alt='PDF Preview'
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
              <p>File Name: {fileName}</p>
            </div>
          ) : (
            <div className='w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-2 text-center text-gray-600'>
              National ID/Birth Certificate
            </div>
          )}
          <div className='flex justify-center'>
            <input
              type='file'
              accept='.pdf'
              onChange={handleDocumentChange}
              className=''
              id='national_id'
              name='national_id'
            />
          </div>
        </div>
        <div className='bg-gray-100 p-2 rounded-lg'>
          <div className='w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-2 text-center text-gray-600'>
            KCPE Certificate
          </div>
          <div className='flex justify-center'>
            <input
              type='file'
              accept='.pdf'
              onChange={handleDocumentChange}
              className='hidden'
              id='KCPE_certificate'
              name='KCPE_certificate'
            />
            <label
              htmlFor='KCPE_certificate'
              className='px-4 py-2 border text-green-600 hover:text-green-800 cursor-pointer'
            >
              Select Document
            </label>
          </div>
        </div>
        <div className='bg-gray-100 p-2 rounded-lg'>
          <div className='w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-2 text-center text-gray-600'>
            KCSE Certificate
          </div>
          <div className='flex justify-center'>
            <input
              type='file'
              accept='.pdf'
              onChange={handleDocumentChange}
              className='hidden'
              id='KCSE_certificate'
              name='KCSE_certificate'
            />
            <label
              htmlFor='KCSE_certificate'
              className='px-4 py-2 border text-green-600 hover:text-green-800 cursor-pointer'
            >
              Select Document
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentUpload;
