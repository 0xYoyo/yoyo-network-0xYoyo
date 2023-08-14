import { useParams } from "react-router-dom";
import DetailedPost from "../parts/DetailedPost";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";
import "../../styles/PostDetail.css";

function PostDetail() {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`${API_URL}/post/${postid}`, {});
      return response.json();
    };
    async function fetchPost() {
      const [newPost, newComments, newUserId] = await getPost();
      setUserId(newUserId);
      setPost(newPost);
      setComments(newComments);
    }
    fetchPost();
  }, [postid]);

  return (
    post && (
      <div className="PostDetail">
        <DetailedPost post={post} comments={comments} userId={userId} />
      </div>
    )
  );
}

export default PostDetail;
