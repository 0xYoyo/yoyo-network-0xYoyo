import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../utils/config";
import { handleMultiPartForm } from "../../utils/multiPartFormHandler";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";

function NewPost({ closeNewPost }) {
  const modalRef = useRef(null);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await handleMultiPartForm(form);
      closeNewPost();
      form.reset();
      if (
        window.location.pathname == "/" ||
        window.location.pathname == "/home" ||
        window.location.pathname == "/profile"
      ) {
        navigate(0);
      }
    } catch (error) {
      setErrors(`${error}`);
    }
  };

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog ref={modalRef} onClose={closeNewPost}>
      <button onClick={closeNewPost} className="leaveBtn">
        X
      </button>
      <form
        action={`${API_URL}/post`}
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleSubmit}
      >
        <ul className="formList">
          <li>
            <label htmlFor="postContent">{`What's on your mind?`}</label>
            <textarea
              type="text"
              id="postContent"
              name="postContent"
              required
            />
          </li>
          <li>
            <label htmlFor="pic">
              <span className="customFileInput">
                <AiOutlineCloudUpload className="uploadIcon" /> Upload picture
              </span>
            </label>
            <input type="file" id="pic" name="pic" />
          </li>
          <li>
            <button type="submit">Send</button>
          </li>
        </ul>
      </form>
      {errors && <p>{errors}</p>}
    </dialog>
  );
}

NewPost.propTypes = {
  closeNewPost: PropTypes.func,
};

export default NewPost;
