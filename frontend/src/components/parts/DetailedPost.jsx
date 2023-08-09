import { DateTime } from "luxon";
import PropTypes from "prop-types";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { useState } from "react";
import NewComment from "./NewComment";
import Comment from "./Comment";

function DetailedPost({ post, comments }) {
  const [postObj, setPostObj] = useState(post);
  const [commentsArr, setCommentsArr] = useState(comments);
  const [newCommentActive, setNewCommentActive] = useState(false);

  const handleNewComment = () => {
    setNewCommentActive((current) => !current);
  };
  const closeNewComment = () => {
    setNewCommentActive(false);
  };
  const handleUpdateComment = (resObj) => {
    setPostObj(resObj[1]);
    setCommentsArr([...commentsArr, resObj[0]]);
  };

  const handleLike = async () => {
    const response = await fetch(`${API_URL}/post/${post._id}/like`, {
      method: "PUT",
    });
    const responseObj = await response.json();
    setPostObj(responseObj);
  };

  return (
    <div className="postPreview">
      <div className="postContents">
        <Link to={`/profile/${post.author._id}`}>
          <div className="userPreview">
            <img src={post.author.pfpUrl} alt="pfp" /> {post.author.displayName}
          </div>
        </Link>
        <div className="contentPreview">
          <p>{post.postContent}</p>
          {post.pictureUrl && <img src={post.pictureUrl} alt="img" />}
          <p>
            {DateTime.fromISO(post.timestamp).toLocaleString(
              DateTime.DATETIME_FULL
            )}
          </p>
        </div>
      </div>
      <div className="postStats">
        <button className="postLikes" onClick={handleLike}>
          <AiOutlineHeart /> {postObj.likedBy.length}
        </button>
        <button className="postComments" onClick={handleNewComment}>
          <AiOutlineComment /> {postObj.comments.length}
        </button>
      </div>
      <div className="postComments">
        <ul className="comments">
          {commentsArr.map((comment) => (
            <li key={comment._id}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      </div>
      {newCommentActive && (
        <NewComment props={[post, handleUpdateComment, closeNewComment]} />
      )}
    </div>
  );
}

DetailedPost.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.array,
};

export default DetailedPost;
