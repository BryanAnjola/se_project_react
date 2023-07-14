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
      <div className="modal__content">
        <button type="button" onClick={onclose}>
          Close
        </button>
        <h3>{title}</h3>
        <form>{children}</form>
        <button type="submit">{buttonText}</button>
      </div>
    </div>
  );
};

export default ModalWithForm;
