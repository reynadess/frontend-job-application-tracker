import React, { useState } from "react";
import Dropzone from "./Dropzone"; // Import Dropzone component

interface ResumeUploaderProps {
  onFileUpload: (file: File) => void; // Callback function to send file back to parent
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    onFileUpload(uploadedFile); // Send file to the parent component
  };

  return (
    <div className="mx-auto p-6 shadow-md rounded-md mt-3">
      <h2 className="text-xl font-bold mb-4">Upload Your Resume</h2>

      {/* Dropzone Component */}
      <Dropzone onFileUpload={handleFileUpload} />

      {/* Show uploaded file details */}
      {file && (
        <div className="mt-4 p-3 border rounded">
          <p className="text-green-600 font-semibold">File Uploaded:</p>
          <p className="text-gray-800">{file.name}</p>
        </div>
      )}

      {/* Upload Button (Optional) */}
      {file && (
        <button
          //onClick={() => console.log("Uploading:", file)}
          className="mt-4 bg-blue-500  px-4 py-2 rounded"
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default ResumeUploader;
