import React, { useState, useEffect, useContext } from "react";
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
    console.log("triggered");
    const location = e.target.location.value;
    const description = e.target.description.value;

    const data = new FormData();
    data.append("file", file);
    data.append("location", location);
    data.append("description", description);
    data.append("userId", user.userId);
    data.append("username", user.username);
    data.append("avatar", user.avatar);

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

  useEffect(() => {
    document.body.style.backgroundImage = "";
  }, []);

  return (
    <div className="upload">
      <div className="segment">
        <h2>Select an image to upload:</h2>{" "}
      </div>

      <form
        className="signinform signinform--upload"
        encType="multipart/form-data"
        onSubmit={handleOnSubmit}
      >
        <div className="upload__input-container">
          <DropZone handleFileDrop={handleFileDrop} file={file} />
        </div>
        <div className="upload__input-container">
          <label className="signinLabel" htmlFor="location">
            <PlacesAutocomplete />
          </label>

          <label htmlFor="description" htmlFor="description">
            <textarea
              className="uploadTextarea"
              name="description"
              id="description"
              cols="30"
              rows="10"
              type="text"
              placeholder="Description"
            ></textarea>
          </label>
          <div align="right">
            <input
              className="upload__file-container"
              type="submit"
              value="Upload Image"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Upload;
