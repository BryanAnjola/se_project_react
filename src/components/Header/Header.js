import "./Header.css";
import logo from "../../images/Logo.svg";
import avatar from "../../images/avatar.svg";

const Header = ({ onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>{currentDate}</div>
      </div>
      <div className="header___avatar-logo">
        <div>
          <button className="nav__button" type="text" onClick={onCreateModal}>
            + Add Clothes
          </button>
        </div>
        <div className="nav__name">Bryan Anjola</div>
        <div>
          {" "}
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
