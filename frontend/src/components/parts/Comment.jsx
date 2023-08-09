import { DateTime } from "luxon";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

function Comment({ comment }) {
  return (
    <div className="comment">
      <Link to={`/profile/${comment.author._id}`}>
        <div className="userPreview">
          <img src={comment.author.pfpUrl} alt="pfp" />{" "}
          {comment.author.displayName}
        </div>
      </Link>
      <div className="contentPreview">
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
};

export default Comment;
