import "./Header.css";
import logo from "../../images/Logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const Header = ({ onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>{currentDate}</div>
      </div>
      <div className="header___avatar-logo">
        <ToggleSwitch />
        <div>
          <button className="nav__button" type="text" onClick={onCreateModal}>
            + Add Clothes
          </button>
        </div>
        <Link to="/profile" className="nav__name">
          Bryan Anjola
        </Link>
        <div>
          {" "}
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
