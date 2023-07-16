import "./ModalWithForm.css";
const ModalWithForm = ({
  children,
  buttonText = "Add Garment",
  title,
  onclose,
  name,
}) => {
  console.log("ModalWithForm");
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content modal__content-form">
        <button
          className="modal__closeBtn"
          type="button"
          onClick={onclose}
        ></button>
        <h3 className="modal__content-title">{title}</h3>
        <form>{children}</form>
        <button className="add__garmentBtn" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
