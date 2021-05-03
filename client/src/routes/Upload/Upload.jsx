import React from "react";
import "./Upload.scss";
import axios from "axios";
import { uploadUrl } from "../../utils/apis";

function Upload() {
  //   const [imageUrl, setImageUrl] = useState("");
  //   const getImage = () => {
  //     axios
  //       .get(`http://localhost:8080/8f8dc85b-2f5a-470d-8cb7-784cd2bc257e`)
  //       .then((res) => {
  //         console.log(res.data);
  //         setImageUrl(res.data);
  //       });
  //   };

  //   useEffect(() => {
  //     getImage();
  //   }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const location = e.target.location.value;
    // const description = e.target.description.value;
    console.log(username, location);

    const file = e.target.image.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("username", username);
    data.append("location", location);

    axios
      .post(uploadUrl(), data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="upload">
      <form encType="multipart/form-data" onSubmit={handleOnSubmit}>
        <label htmlFor="username">
          <h3>User Name: </h3>
          <input
            className="upload__inputField"
            type="text"
            name="username"
            id="username"
          />
        </label>
        <label htmlFor="location">
          <h3>Location: </h3>
          <input
            className="upload__inputField"
            type="text"
            name="location"
            id="location"
          />
        </label>
        <label htmlFor="location">
          <h3>Description: </h3>
          <input
            className="upload__inputField"
            type="text"
            name="description"
            id="description"
          />
        </label>
        <label htmlFor="image">
          <h3>Select an image to upload:</h3>
          <input className="upload__file-container" type="file" name="image" />
        </label>
        <input
          className="upload__file-container"
          type="submit"
          value="Upload Image"
        />
      </form>
    </div>
  );
}

export default Upload;
