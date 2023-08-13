import { DateTime } from "luxon";
import PropTypes from "prop-types";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { useState } from "react";
import NewComment from "./NewComment";

function Post({ post, user }) {
  const [postObj, setPostObj] = useState(post);
  const [newCommentActive, setNewCommentActive] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likedBy.includes(user._id));

  const handleNewComment = () => {
    setNewCommentActive((current) => !current);
  };
  const closeNewComment = () => {
    setNewCommentActive(false);
  };
  const handleUpdateComment = (resObj) => {
    setPostObj(resObj[1]);
  };

  const handleLike = async () => {
    const response = await fetch(`${API_URL}/post/${post._id}/like`, {
      method: "PUT",
    });
    const responseObj = await response.json();
    setPostObj(responseObj);
    setIsLiked((current) => !current);
  };

  return (
    <div className="postPreview">
      <Link to={`/post/${post._id}`}>
        <div className="postContents">
          <div className="userPreview">
            <img src={post.author.pfpUrl} alt="pfp" />{" "}
            <div>{post.author.displayName}</div>
          </div>
          <div className="contentPreview">
            <p>{post.postContent}</p>
            {post.pictureUrl && (
              <img src={post.pictureUrl} alt="img" className="postImage" />
            )}
          </div>
          <p className="timestamp">
            {DateTime.fromISO(post.timestamp).toLocaleString()}
          </p>
        </div>
      </Link>
      <div className="postStats">
        <button
          className={isLiked ? "postLikes likedActive" : "postLikes "}
          onClick={handleLike}
        >
          {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}{" "}
          {postObj.likedBy.length}
        </button>
        <button className="postComments" onClick={handleNewComment}>
          <AiOutlineComment /> {postObj.comments.length}
        </button>
      </div>
      {newCommentActive && (
        <NewComment props={[post, handleUpdateComment, closeNewComment]} />
      )}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
};

export default Post;
