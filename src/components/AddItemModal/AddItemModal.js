import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const [weather, setWeatherType] = useState("");
  const handleWeatherType = (e) => {
    setWeatherType(e.target.value);
  };
  useEffect(() => {
    if (isOpen) {
      setName("");
      setWeatherType("");
      setUrl("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather });
  };
  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="input__group">
        <label className="label__input">
          Name
          <input
            className="form__input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            onChange={handleNameChange}
            value={name}
          />
        </label>
        <label className="label__input">
          Image
          <input
            className="form__input"
            type="url"
            link="link"
            minLength="1"
            maxLength="300"
            placeholder="Image URL"
            value={link}
            onChange={handleUrlChange}
          />
        </label>
      </fieldset>
      <fieldset className="input__group">
        <p className="label__input label__input-weather">
          Select The Weather Type:
        </p>
        <div>
          <div>
            <input
              className="radio__input"
              type="radio"
              id="radio-input"
              value="hot"
              onChange={handleWeatherType}
            />
            <label>Hot</label>
          </div>
          <div>
            <input
              className="radio__input"
              type="radio"
              id="radio-input"
              value="warm"
              onChange={handleWeatherType}
            />
            <label>Warm</label>
          </div>
          <div>
            <input
              className="radio__input"
              type="radio"
              id="radio-input"
              value="cold"
              onChange={handleWeatherType}
            />
            <label>Cold</label>
          </div>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
