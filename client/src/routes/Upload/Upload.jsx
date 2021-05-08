import React, { useState, useContext } from "react";
import "./Upload.scss";
import axios from "axios";
import { uploadUrl } from "../../utils/apis";
import { globalContext } from "../../context/GlobalContext";
import DropZone from "../../components/Dropzone/Dropzone";
import PlacesAutocomplete from "../../components/PlaceAutocomplete/PlaceAutocomplete";

function Upload(props) {
  const { user } = useContext(globalContext);
  const [file, setFile] = useState(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const description = e.target.description.value;

    const data = new FormData();
    data.append("file", file);
    data.append("location", location);
    data.append("description", description);
    data.append("userId", user.userId);
    data.append("username", user.username);

    axios
      .post(uploadUrl(), data)
      .then((res) => {
        console.log(res.data);
        alert("upload success!");
        props.history.push(`/${res.data.imgId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileDrop = (file) => {
    setFile(file);
  };

  return (
    <div className="upload">
      {file && (
        <img
          className="upload__image"
          src={URL.createObjectURL(file)}
          alt="upload image"
        />
      )}

      <form encType="multipart/form-data" onSubmit={handleOnSubmit}>
        <label htmlFor="image">
          <h3>Select an image to upload:</h3>{" "}
          <DropZone handleFileDrop={handleFileDrop} />
        </label>
        <label htmlFor="location">
          <h3>Location: </h3>
          {/* <input
            className="upload__inputField"
            type="text"
            name="location"
            id="location"
          /> */}
          <PlacesAutocomplete />
        </label>
        <label htmlFor="description">
          <h3>Description: </h3>
          <input
            className="upload__inputField"
            type="text"
            name="description"
            id="description"
          />
        </label>
        <div>
          <input
            className="upload__file-container"
            type="submit"
            value="Upload Image"
          />
        </div>
      </form>
    </div>
  );
}

export default Upload;
