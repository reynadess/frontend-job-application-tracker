import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onFileUpload: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]); // Pass file to parent component
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-6 text-center cursor-pointer rounded-lg"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500 font-semibold">Drop the resume here...</p>
      ) : (
        <p className="text-gray-600">Drag & drop a resume here, or click to browse</p>
      )}
    </div>
  );
};

export default Dropzone;
