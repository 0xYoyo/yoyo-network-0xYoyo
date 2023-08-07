import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

function NewPost() {
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const dialog = modalRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog ref={modalRef}>
      <form>
        <h5>New Post:</h5>
        <label htmlFor="postContent">Content:</label>
        <input ref={inputRef} type="text" id="name" required />
        <button type="submit">Submit result</button>
      </form>
    </dialog>
  );
}

export default NewPost;
