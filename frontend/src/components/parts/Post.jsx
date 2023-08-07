import { DateTime } from "luxon";
import PropTypes from "prop-types";

function Post({ post }) {
  console.log(post);
  return (
    <div className="post">
      <div className="top">
        <img src={post.author.pfpUrl} alt="pfp" /> {post.author.displayName}
      </div>
      <p>{post.postContent}</p>
      {post.pictureUrl && <img src={post.pictureUrl} alt="img" />}
      <p>{DateTime.fromISO(post.timestamp).toLocaleString()}</p>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
