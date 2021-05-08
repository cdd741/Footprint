import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Home.scss";
import { URL, getPostByIdUrl, getPostUrl } from "../../utils/apis";
import Comments from "../../components/Comments/Comments";

function Home(props) {
  const [postInfo, setPostInfo] = useState(null);
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    if (props.match) {
      const id = props.match.params.id;
      axios.get(getPostByIdUrl(id)).then((res) => {
        console.log(res.data);
        setPostInfo(res.data);
      });
    } else {
      axios.get(getPostUrl()).then((res) => {
        console.log(res.data);
        setPostInfo(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (update) {
      axios.get(getPostByIdUrl(postInfo.imgId)).then((res) => {
        console.log(res.data);
        setPostInfo(res.data);
      });
      setUpdate(false);
    }
  }, [update]);

  return (
    postInfo && (
      <div className="home">
        <div className="home__hero">
          <img
            className="home__hero-image"
            src={`${URL}/${postInfo.curImgObj.imgUrl}`}
            alt="hero picture"
          />
        </div>
        <div className="home__main-container">
          <div className="home__details">
            <div className="home__info">
              <div className="home_profile">
                <div className="profile-pic">
                  <img src="" alt="profile" />
                </div>
              </div>
              <div className="home__name-location-container">
                <div className="home__name" id={postInfo.curImgObj.user.userId}>
                  {postInfo.curImgObj.user.username}
                </div>
                <div className="home__location">
                  {postInfo.curImgObj.location}
                </div>
              </div>
              <div className="home__date">{postInfo.curImgObj.timestemp}</div>
            </div>
            <div className="home__description">
              {postInfo.curImgObj.description}
            </div>
          </div>
          <Comments
            imageId={postInfo.curImgObj.imgId}
            comments={postInfo.curImgObj.comments}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
    )
  );
}

export default Home;
