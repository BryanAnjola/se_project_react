import './SideBar.css';

const SideBar = ({ handleUserLogout, currentUser, openModal }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__avatar-wrapper">
        {currentUser.avatar ? (
          <img
            alt="sidebar__avatar"
            src={currentUser.avatar}
            className="sidebar__avatar-picture"
          />
        ) : (
          <div className="sidebar__avatar-picture">
            <p id="avatar__picture-replacement">{currentUser.name[0]}</p>
          </div>
        )}

        <p className="sidebar__avatar-name">
          {currentUser ? currentUser.name : 'No Name'}
        </p>
      </div>
      <div className="sidebar__user-wrapper">
        <button
          className="sidebar__button sidebar__edit-profile"
          type="button"
          onClick={() => {
            openModal('edit-profile-modal-opened');
          }}
        >
          Edit Profile
        </button>
        <button
          className="sidebar__button sidebar__logout"
          type="button"
          onClick={() => handleUserLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
