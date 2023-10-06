import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './ItemModal.css';

const ItemModal = ({
  onClose,
  selectedCard,
  handleOpenConfirm,
  isLoggedIn,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser?._id;

  return (
    <section className="modal" onClick={onClose}>
      <div className="modal__container item__modal-container">
        <button
          className="modal__exit"
          type="button"
          onClick={onClose}
        ></button>
        <div className="item__modal">
          <p className="item__modal-title">{selectedCard.name}</p>
          <img
            className="item__modal-image"
            alt={selectedCard.name}
            src={selectedCard.imageUrl}
          />
        </div>
        <p className="item__modal-weather">Weather: {selectedCard.weather}</p>
        {isOwn && isLoggedIn === true ? (
          <button
            className="item__modal-delete_button"
            type="button"
            onClick={() => handleOpenConfirm('confirmation-opened')}
          >
            Delete item
          </button>
        ) : (
          <span></span>
        )}
      </div>
    </section>
  );
};

export default ItemModal;
