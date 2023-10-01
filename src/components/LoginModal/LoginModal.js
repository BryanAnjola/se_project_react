import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  handleCloseModal,
  isOpen,
  handleLogin,
  setActiveModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailchange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
    handleCloseModal();
  };
  const onClickSignup = () => {
    setActiveModal("signup");
  };
  return (
    <ModalWithForm
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <h2>Log in</h2>
      <label className="modal__label">
        email
        <input
          className="modal__email"
          type="email"
          name="email"
          placeholder="Email"
          required="true"
          value={email}
          onChange={handleEmailchange}
        ></input>
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__password"
          type="text"
          name="password"
          placeholder="PassWord"
          minLength="1"
          maxLength="8"
          required="true"
          value={password}
          onChange={handlePasswordChange}
        ></input>
      </label>
      <div className="modall__button-container">
        <button
          className="modal__submit-button"
          type="submit"
          name="button"
          onChange={handleSubmit}
        >
          Login
        </button>
        <button
          className="modal__submit-register-button"
          type="button"
          name="button"
          onClick={onClickSignup}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};
export default LoginModal;
