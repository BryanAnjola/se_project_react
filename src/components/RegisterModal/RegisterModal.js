import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onCloseModal, onRedirect, userRegister }) => {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userRegister(inputValues);
  };
  console.log(inputValues);

  return (
    <ModalWithForm
      title="Sign Up"
      name="register__user"
      buttonText="Next"
      buttonRedirectText="or Log in"
      redirect={onRedirect}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      {/* Email input */}
      <div className="modal__input">
        <label htmlFor="modal__input-email">Email*</label>
        <input
          id="modal__input-email"
          className="modal__input-form"
          name="email"
          type="email"
          placeholder="Email"
          minLength="1"
          maxLength="30"
          value={inputValues.email || ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <span className=""></span>
      {/* Password input */}
      <div className="modal__input">
        <label htmlFor="modal__input-password">Password*</label>
        <input
          id="modal__input-password"
          className="modal__input-form"
          name="password"
          type="password"
          placeholder="Password"
          minLength="8"
          maxLength="30"
          value={inputValues.password || ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <span className=""></span>
      {/* Name Input */}
      <div className="modal__input">
        <label htmlFor="modal__input-register-name">Name</label>
        <input
          id="modal__input-register-name"
          className="modal__input-form"
          name="name"
          type="text"
          placeholder="Name"
          value={inputValues.name || ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <span className=""></span>
      {/* Image URL Input */}
      <div className="modal__input">
        <label htmlFor="modal__input-register-url">Avatar URL</label>
        <input
          id="modal__input-register-url"
          className="modal__input-form"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={inputValues.avatar || ""}
          onChange={handleInputChange}
        />
      </div>
      <span className=""></span>
    </ModalWithForm>
  );
};

export default RegisterModal;
