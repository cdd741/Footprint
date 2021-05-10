import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "./Home.scss";
import { URL, getPostByIdUrl, getPostUrl } from "../../utils/apis";
import Comments from "../../components/Comments/Comments";
import "./arrow.scss";
import { globalContext } from "../../context/GlobalContext";
import getTimePassed from "../../utils/getTimePassed";
import LocationOnIcon from "@material-ui/icons/LocationOn";

function Home(props) {
  const [update, setUpdate] = useState(false);
  const { postInfo, setPostInfo } = useContext(globalContext);

  const handleUpdate = () => {
    setUpdate(true);
  };

  const onClickBack = (e) => {
    e.preventDefault();
    axios.get(getPostByIdUrl(postInfo.previousId)).then((res) => {
      setPostInfo(res.data);
    });
  };

  const onClickForward = (e) => {
    e.preventDefault();
    axios.get(getPostByIdUrl(postInfo.previousId)).then((res) => {
      setPostInfo(res.data);
    });
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
      axios.get(getPostByIdUrl(postInfo.curImgObj.imgId)).then((res) => {
        console.log(res.data);
        setPostInfo(res.data);
      });
      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    if (postInfo)
      document.querySelector(
        ".home__background"
      ).style.backgroundImage = `url(${URL}/${postInfo.curImgObj.imgUrl})`;
  }, [postInfo]);

  const getDate = (timestamp) => {
    const event = new Date(timestamp);
    return event.toLocaleDateString();
  };

  return (
    postInfo && (
      <div className="home">
        <div className="home__background"></div>
        <div className="home__hero">
          <div className="arrowBack" onClick={onClickBack}>
            <div className="arrowBack-top"></div>
            <div className="arrowBack-bottom"></div>
          </div>
          <div className="arrowForward" onClick={onClickForward}>
            <div className="arrowForward-top"></div>
            <div className="arrowForward-bottom"></div>
          </div>
        </div>
        <div className="home__main-container-wrapper">
          <div className="home__main-container">
            <div className="home__profile">
              <div className="home__container--left">
                <img
                  className="home__profile-picture"
                  src={postInfo.curImgObj.user.avatar}
                  alt="profile"
                />
              </div>
              <div className="home__container--right">
                <div className="home__container--upper">
                  <div className="home__info">
                    <h2 className="home__profile-name">
                      {postInfo.curImgObj.user.username}
                    </h2>
                    <div className="home__profile-location">
                      {postInfo.curImgObj.location}
                      <LocationOnIcon />
                    </div>
                  </div>
                  <div className="home__profile-date">
                    {getDate(postInfo.curImgObj.timestemp)}
                  </div>
                </div>
                <div className="home__container--lower">
                  {postInfo.curImgObj.description}
                </div>
              </div>
            </div>
            <Comments
              imageId={postInfo.curImgObj.imgId}
              comments={postInfo.curImgObj.comments}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default Home;
