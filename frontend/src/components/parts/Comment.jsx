import { DateTime } from "luxon";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";

function Comment({ comment, userId, handleDeleteComment }) {
  const [isCommentAuthor, setIsCommentAuthor] = useState(false);

  useEffect(() => {
    if (comment.author._id == userId) {
      setIsCommentAuthor(true);
    }
  }, [comment, userId]);

  const handleDelete = async () => {
    const response = await fetch(
      `${API_URL}/post/${comment.parentPost}/comment/${comment._id}`,
      {
        method: "DELETE",
      }
    );
    const responseObj = await response.json();
    handleDeleteComment(responseObj);
  };

  return (
    <div className="comment">
      <div className="commentTop">
        <Link to={`/profile/${comment.author._id}`}>
          <div className="userPreview">
            <img src={comment.author.pfpUrl} alt="pfp" />{" "}
            {comment.author.displayName}
          </div>
        </Link>
        {isCommentAuthor && (
          <button id="delBtn">
            <AiOutlineDelete onClick={handleDelete} />
          </button>
        )}
      </div>
      <div className="commentContentPreview">
        <p>{comment.commentContent}</p>
        <p>
          {DateTime.fromISO(comment.timestamp).toLocaleString(
            DateTime.DATETIME_FULL
          )}
        </p>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  userId: PropTypes.string,
  handleDeleteComment: PropTypes.func,
};

export default Comment;
