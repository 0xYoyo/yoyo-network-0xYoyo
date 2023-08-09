import { useParams } from "react-router-dom";
import DetailedPost from "../parts/DetailedPost";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";

function PostDetail() {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const getPost = async () => {
    const response = await fetch(`${API_URL}/post/${postid}`, {});
    return response.json();
  };

  useEffect(() => {
    async function fetchPost() {
      const [newPost, newComments] = await getPost();
      setPost(newPost);
      setComments(newComments);
    }
    fetchPost();
  }, []);

  return (
    post && (
      <div className="PostDetail">
        <DetailedPost post={post} comments={comments} />
      </div>
    )
  );
}

export default PostDetail;
