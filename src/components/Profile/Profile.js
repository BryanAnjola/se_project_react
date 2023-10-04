import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./Profile.css";
const Profile = ({
  onSelectCard,
  onCreateModal,
  clothingItems,
  handleSubmit,
  onSignOut,
  onOpenEditProfileModal,
}) => {
  return (
    <div className="profile">
      <SideBar
        onSignOut={onSignOut}
        onOpenEditProfileModal={onOpenEditProfileModal}
      />
      <ClothesSection
        onSelectCard={onSelectCard}
        onCreateModal={onCreateModal}
        clothingItems={clothingItems}
      />
    </div>
  );
};

export default Profile;
