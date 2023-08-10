import { DateTime } from "luxon";
import PropTypes from "prop-types";
import {
  AiOutlineComment,
  AiOutlineDelete,
  AiOutlineHeart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { useEffect, useState } from "react";
import NewComment from "./NewComment";
import Comment from "./Comment";

function DetailedPost({ post, comments, userId }) {
  const [postObj, setPostObj] = useState(post);
  const [commentsArr, setCommentsArr] = useState(comments);
  const [newCommentActive, setNewCommentActive] = useState(false);
  const [isPostAuthor, setIsPostAuthor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (post.author._id == userId) {
      setIsPostAuthor(true);
    }
  }, [post, userId]);

  const handleNewComment = () => {
    setNewCommentActive((current) => !current);
  };
  const closeNewComment = () => {
    setNewCommentActive(false);
  };
  const handleUpdateComment = (resObj) => {
    setPostObj(resObj[1]);
    setCommentsArr([resObj[0], ...commentsArr]);
  };
  const handleDeleteComment = (resObj) => {
    console.log(resObj);
    setCommentsArr((commentArr) =>
      commentArr.filter((c) => c._id !== resObj[0]._id)
    );
    setPostObj(resObj[1]);
  };

  const handleLike = async () => {
    const response = await fetch(`${API_URL}/post/${post._id}/like`, {
      method: "PUT",
    });
    const responseObj = await response.json();
    setPostObj(responseObj);
  };

  const handleDeletePost = async () => {
    const response = await fetch(`${API_URL}/post/${post._id}`, {
      method: "DELETE",
    });
    const responseObj = await response.json();
    console.log(responseObj);
    navigate(-1);
  };

  return (
    <div className="postPreview">
      {isPostAuthor && (
        <button>
          <AiOutlineDelete onClick={handleDeletePost} />
        </button>
      )}
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
              <Comment
                comment={comment}
                userId={userId}
                handleDeleteComment={handleDeleteComment}
              />
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
  userId: PropTypes.string,
};

export default DetailedPost;
