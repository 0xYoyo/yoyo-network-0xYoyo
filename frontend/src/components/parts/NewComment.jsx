import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../utils/config";
import { PropTypes } from "prop-types";
import { postFormDataAsJson } from "../../utils/authFormHandler";

function NewComment({ props }) {
  const [post, handleUpdateComment, closeNewComment] = props;
  const modalRef = useRef(null);
  const [errors, setErrors] = useState("");

  const handleForm = async (form) => {
    const url = form.action;
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });
    console.log({ responseData });
    closeNewComment();
    handleUpdateComment(responseData[1]);
    form.reset();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await handleForm(form);
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
      <button onClick={closeNewComment}>X</button>
      <form
        action={`${API_URL}/post/${post._id}/comment`}
        method="POST"
        onSubmit={handleSubmit}
      >
        <h5>New Comment:</h5>
        <label htmlFor="commentContent">Content:</label>
        <input type="text" id="commentContent" name="commentContent" required />
        <button type="submit">Send</button>
      </form>
      {errors && <p>{errors}</p>}
    </dialog>
  );
}

NewComment.propTypes = {
  props: PropTypes.array,
};

export default NewComment;
