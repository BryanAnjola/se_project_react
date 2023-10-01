import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const EditProfileModal = ({ handleCloseModal, isOpen }, currentUser) => {
  const [name, setName] = useState(currentUser.name);
  const [avatar, setUrl] = useState(currentUser.avatar);

  const handleNameChange = (e) => {
    console.log(e.target.value);
  };
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleNameChange();
    handleUrlChange();
  };
  return (
    <ModalWithForm
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <h2>Sign up</h2>
      <label className="modal__input-name">
        Name
        <input
          type="text"
          name="name"
          placeholder="name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        ></input>
      </label>
      <label className="modal__label">
        avatar
        <input
          className="modal__input-link"
          type="url"
          name="avatar"
          placeholder="Image URL"
          minLength="1"
          maxLength="300"
          value={avatar}
          onChange={handleUrlChange}
        ></input>
      </label>
      <button
        className="modal__submit-button"
        type="submit"
        name="button"
        onChange={handleSubmit}
      >
        Submit Changes
      </button>
    </ModalWithForm>
  );
};
export default EditProfileModal;
