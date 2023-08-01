import "./ItemModal.css";
const ItemModal = ({ selectedCard, onClose, handleOpenConfirm }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button
          className="modal__closeBtn"
          type="button"
          onClick={onClose}
        ></button>
        <img className="modal__image " src={selectedCard.link} alt="image" />
        <h2 className="modal__title">{selectedCard.name}</h2>
        <div className="modal__weather-type">
          Weather: {selectedCard.weather}
        </div>
        <button
          className="modal__delete"
          type="button"
          onClick={handleOpenConfirm}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};
export default ItemModal;
