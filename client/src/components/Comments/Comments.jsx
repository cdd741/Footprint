import React, { useState, useContext } from "react";
import axios from "axios";
import "./Comments.scss";
import Button from "../Button/Button";
import getTimePassed from "../../utils/getTimePassed";
import { globalContext } from "../../context/GlobalContext";
import { commentPostUrl } from "../../utils/apis";

function Comments({ imageId, comments, handleUpdate }) {
  const { user, loggingInfo } = useContext(globalContext);

  // using react hook in the functional component
  const [commentText, setCommentText] = useState("");

  const handleOnChange = (e) => {
    // set the commentText state when something changes in the textarea
    setCommentText(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!loggingInfo) {
      alert("You need to log in to comment");
    } else if (commentText === "") {
      alert("You cannot submit empty comment");
    } else {
      axios
        .post(commentPostUrl(imageId), {
          user: { userId: user.userId, username: user.username },
          comment: commentText,
        })
        .then((res) => {
          console.log(res.data);
          // inform parent componsent to rerender
          handleUpdate();
          // reset textarea
          setCommentText("");
        })
        .catch((err) =>
          console.error("ERROR from POST request in handleOnSubmit", err)
        );
    }
  };

  return (
    <div className="comments">
      <h3 className="comments__title">{comments.length} Comments</h3>

      <div className="comments__form">
        <img className="comments__profile-picture" src="" alt="profile pic" />
        <form className="comments__input" onSubmit={handleOnSubmit}>
          <label className="comments__label" htmlFor="comment">
            <h5 className="comments__label-text">JOIN THE CONVERSATION</h5>
            <textarea
              className="comments__textarea"
              type="text"
              name="comment"
              id="comment"
              value={commentText}
              placeholder="Add a comment"
              onChange={handleOnChange}
            ></textarea>
          </label>
          <Button className="comments__button" content="COMMENT" />
        </form>
      </div>

      <ul className="comments__list">
        {comments
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((comment) => {
            let timePassed = getTimePassed(comment.timestamp);
            return (
              <li
                className="comment"
                id={comment.commentId}
                key={comment.commentId}
              >
                <img
                  className="comment__item comment__item--left"
                  src={comment.img}
                  alt=""
                />
                <div className="comment__item comment__item--right">
                  <div className="comment__title">
                    <h4 className="comment__name">{comment.name}</h4>
                    <h4 className="comment__date">{timePassed}</h4>
                  </div>
                  <p className="comment__description">{comment.comment}</p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Comments;
