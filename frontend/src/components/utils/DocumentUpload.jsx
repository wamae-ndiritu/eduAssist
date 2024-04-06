import { useState } from "react";

function DocumentUpload() {
  const [documents, setDocuments] = useState(Array(4).fill(null));
  console.log(documents)

const handleDocumentChange = (e, index) => {
  const selectedDocument = e.target.files[0];
  const updatedDocuments = [...documents];
  updatedDocuments[index] = selectedDocument
  setDocuments(updatedDocuments);
};
  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h2 className='text-2xl font-bold mb-4'>Upload Documents</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {documents.map((document, index) => {
            let isPdf = null;
            let docUrl = ""
            if (document){
                isPdf = document?.type === "application/pdf";
                docUrl = URL.createObjectURL(document);
            }
            return (
              <div key={index} className='bg-gray-100 p-4 rounded-lg'>
                {document ? (
                  isPdf ? (
                    <iframe
                      src={docUrl}
                      title={`Document ${index + 1}`}
                      className='w-full h-48 rounded-lg mb-2'
                    ></iframe>
                  ) : (
                    <img
                      src={docUrl}
                      alt={`Document ${index + 1}`}
                      className='w-full h-48 object-cover rounded-lg mb-2'
                    />
                  )
                ) : (
                  <div className='w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-2'>
                    Upload Document {index + 1}
                  </div>
                )}
                <input
                  type='file'
                  accept='.pdf, .jpg, .jpeg, .png'
                  onChange={(e) => handleDocumentChange(e, index)}
                  className='hidden'
                  id={`document-upload-${index}`}
                />
                <label
                  htmlFor={`document-upload-${index}`}
                  className='text-blue-600 hover:text-blue-800 cursor-pointer'
                >
                  Select Document
                </label>
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default DocumentUpload;
