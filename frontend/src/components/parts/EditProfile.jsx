import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../utils/config";
import { handleMultiPartForm } from "../../utils/multiPartFormHandler";
import { PropTypes } from "prop-types";

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
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog ref={modalRef}>
      <button onClick={closeEdit}>X</button>
      <form
        action={`${API_URL}/profile/${currentUser._id}`}
        encType="multipart/form-data"
        method="PUT"
        onSubmit={handleSubmit}
      >
        <h5>Edit:</h5>
        <label htmlFor="displayName">Display name:</label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          defaultValue={currentUser.displayName}
          required
        />
        <label htmlFor="bio">Bio:</label>
        <input
          type="text"
          id="bio"
          name="bio"
          defaultValue={currentUser.bio || ""}
        />
        <label htmlFor="pfp">Upload profile picture:</label>
        <input type="file" id="pfp" name="pfp" />
        <button type="submit">Confirm</button>
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
