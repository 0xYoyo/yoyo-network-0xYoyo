import { DateTime } from "luxon";
import PropTypes from "prop-types";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { useState } from "react";
import NewComment from "./NewComment";

function Post({ post }) {
  const [postObj, setPostObj] = useState(post);
  const [newCommentActive, setNewCommentActive] = useState(false);

  const handleNewComment = () => {
    setNewCommentActive((current) => !current);
  };
  const closeNewComment = () => {
    setNewCommentActive(false);
  };
  const handleUpdateComment = (resObj) => {
    setPostObj(resObj);
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
      <Link to={`/posts/${post._id}`}>
        <div className="postContents">
          <div className="userPreview">
            <img src={post.author.pfpUrl} alt="pfp" /> {post.author.displayName}
          </div>
          <div className="contentPreview">
            <p>{post.postContent}</p>
            {post.pictureUrl && <img src={post.pictureUrl} alt="img" />}
            <p>{DateTime.fromISO(post.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </Link>
      <div className="postStats">
        <button className="postLikes" onClick={handleLike}>
          <AiOutlineHeart /> {postObj.likedBy.length}
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
};

export default Post;
