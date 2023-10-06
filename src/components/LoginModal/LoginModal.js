import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const LoginModal = ({ isOpen, onCloseModal, onRedirect, userLogin }) => {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(inputValues);
  };

  return (
    <ModalWithForm
      title="Log in"
      name="login__user"
      buttonText="Log in"
      buttonRedirectText="or Register"
      redirect={onRedirect}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      {/* Email input */}
      <div className="modal__input">
        <label htmlFor="modal__input-email">Email</label>
        <input
          id="modal__input-email"
          className="modal__input-form"
          name="email"
          type="email"
          placeholder="Email"
          value={inputValues.email || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <span className=""></span>
      {/* Password input */}
      <div className="modal__input">
        <label htmlFor="modal__input-password">Password</label>
        <input
          id="modal__input-password"
          className="modal__input-form"
          name="password"
          type="password"
          placeholder="Password"
          value={inputValues.password || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <span className=""></span>
    </ModalWithForm>
  );
};

export default LoginModal;
