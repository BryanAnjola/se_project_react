import "./Header.css";

const Header = ({ onCreateModal }) => {
  console.log("Header");
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../images/Logo.svg").default} alt="logo" />
        </div>
        <div>date</div>
      </div>
      <div className="header___avatar-logo">
        <div>
          <button type="text" onClick={onCreateModal}>
            + Add New Clothes
          </button>
        </div>
        <div>Bryan Anjola</div>
        <div>
          {" "}
          <img src={require("../images/avatar.svg").default} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
