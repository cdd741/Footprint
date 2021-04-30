import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  // const getImage = () => {
  //   axios
  //     .get(`http://localhost:8080/8f8dc85b-2f5a-470d-8cb7-784cd2bc257e`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setImageUrl(res.data);
  //     });
  // };

  // useEffect(() => {
  //   getImage();
  // }, []);

  return (
    <div className="App">
      <form
        action="http://192.168.2.75:8080/upload"
        method="POST"
        encType="multipart/form-data"
      >
        Select an image to upload:
        <input type="file" name="image" />
        <input type="submit" value="Upload Image" />
      </form>
      <img src={imageUrl} alt="img" />
    </div>
  );
}

export default App;
