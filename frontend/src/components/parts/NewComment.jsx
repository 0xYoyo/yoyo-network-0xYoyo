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
    handleUpdateComment(responseData);
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
    if (!dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog ref={modalRef} onClose={closeNewComment}>
      <button onClick={closeNewComment} className="leaveBtn">
        X
      </button>
      <form
        action={`${API_URL}/post/${post._id}/comment`}
        method="POST"
        onSubmit={handleSubmit}
      >
        <ul className="formList">
          <li>
            <label htmlFor="commentContent">Content:</label>
            <textarea
              type="text"
              id="commentContent"
              name="commentContent"
              required
            />
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

NewComment.propTypes = {
  props: PropTypes.array,
};

export default NewComment;
