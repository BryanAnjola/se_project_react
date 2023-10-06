import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ onClose, card, handleDeleteCard }) => {
  return (
    <section className="modal" onClick={onClose}>
      <div className="delete__confirmation-modal">
        <button
          className="delete__confirmation-button_exit"
          type="button"
          onClick={onClose}
        ></button>
        <div className="delete__confirmation-wrapper">
          <p className="delete__confirmation-notification">
            Are you sure you want to delete this item? <br />
            This action is irreversible
          </p>
          <button
            className="delete__confirmation-button_yes"
            type="button"
            onClick={() => {
              handleDeleteCard(card._id);
            }}
          >
            Yes, delete item
          </button>
          <button
            className="delete__confirmation-button_cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteConfirmationModal;
