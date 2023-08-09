import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../utils/config";
import { handleMultiPartForm } from "../../utils/multiPartFormHandler";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

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
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog ref={modalRef}>
      <button onClick={closeNewPost}>X</button>
      <form
        action={`${API_URL}/post`}
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h5>New Post:</h5>
        <label htmlFor="postContent">Content:</label>
        <input type="text" id="postContent" name="postContent" required />
        <label htmlFor="pic">Upload picture:</label>
        <input type="file" id="pic" name="pic" />
        <button type="submit">Send</button>
      </form>
      {errors && <p>{errors}</p>}
    </dialog>
  );
}

NewPost.propTypes = {
  closeNewPost: PropTypes.func,
};

export default NewPost;
