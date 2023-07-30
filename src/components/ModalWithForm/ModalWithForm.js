import "./ModalWithForm.css";
const ModalWithForm = ({
  children,
  buttonText = "Add Garment",
  title,
  onclose,
  name,
  isOpen,
  onSubmit,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content modal__content-form">
        <button className="modal__closeBtn" type="button" onClick={onclose} />
        <h3 className="modal__content-title">{title}</h3>
        <form onSubmit={onSubmit}>
          {children}
          <button className="add__garmentBtn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
