import "../ModalWithForm/ModalWithForm.css";
const ItemModal = ({ selectedCard, onclose }) => {
  console.log("item modal");
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button type="button" onClick={onclose}>
          Close
        </button>
        <img src={selectedCard.link} />
        <div>{selectedCard.name}</div>
        <div>Weather Type:{selectedCard.weather}</div>
      </div>
    </div>
  );
};
export default ItemModal;
