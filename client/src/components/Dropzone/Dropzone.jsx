import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./Dropzone.scss";

export default function Dropzone({ handleFileDrop, file }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    handleFileDrop(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropdownzone">
      <input {...getInputProps()} className="dropdownzone__input" />
      {isDragActive ? (
        <label htmlFor="description" htmlFor="description">
          <h4 class="uploadBox">Drop the image here ...</h4>
        </label>
      ) : (
        <label htmlFor="description" htmlFor="description">
          <p class="uploadBox">
            Drag 'n' drop some image here, or click to select image
          </p>
        </label>
      )}
      {file && (
        <img
          className="upload__image"
          src={URL.createObjectURL(file)}
          alt="upload image"
        />
      )}
    </div>
  );
}
