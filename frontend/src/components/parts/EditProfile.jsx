import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../utils/config";
import { handleMultiPartForm } from "../../utils/multiPartFormHandler";
import { PropTypes } from "prop-types";
import { AiOutlineCloudUpload } from "react-icons/ai";

function EditProfile({ handleUpdateUser, closeEdit, currentUser }) {
  const modalRef = useRef(null);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const resObj = await handleMultiPartForm(form);
      handleUpdateUser(resObj);
      form.reset();
    } catch (error) {
      setErrors(`${error}`);
    }
  };

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog ref={modalRef} onClose={closeEdit}>
      <button onClick={closeEdit} className="leaveBtn">
        X
      </button>
      <form
        action={`${API_URL}/profile/${currentUser._id}`}
        encType="multipart/form-data"
        method="PUT"
        onSubmit={handleSubmit}
      >
        <ul className="formList">
          <li>
            <label htmlFor="displayName">Display name:</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              defaultValue={currentUser.displayName}
              required
            />
          </li>
          <li>
            <label htmlFor="bio">Bio:</label>
            <textarea
              type="text"
              id="bio"
              name="bio"
              defaultValue={currentUser.bio || ""}
            />
          </li>
          <li>
            <label htmlFor="pfp">
              <span className="customFileInput">
                <AiOutlineCloudUpload className="uploadIcon" />
                Upload profile picture:
              </span>
            </label>
            <input type="file" id="pfp" name="pfp" />
          </li>
          <li>
            <button type="submit">Save changes</button>
          </li>
        </ul>
      </form>
      {errors && <p>{errors}</p>}
    </dialog>
  );
}

EditProfile.propTypes = {
  handleUpdateUser: PropTypes.func,
  closeEdit: PropTypes.func,
  currentUser: PropTypes.object,
};

export default EditProfile;
