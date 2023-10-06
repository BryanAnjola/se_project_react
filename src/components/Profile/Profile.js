import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
import './Profile.css';

const Profile = ({
  onSelectCard,
  clothingItems,
  handleUserLogout,
  openModal,
  onCardLike,
  isLoggedIn,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <SideBar
        handleUserLogout={handleUserLogout}
        currentUser={currentUser}
        openModal={openModal}
      />
      <ClothesSection
        onSelectCard={onSelectCard}
        openAddClothesModal={openModal}
        clothingItems={clothingItems}
        currentUser={currentUser}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default Profile;
