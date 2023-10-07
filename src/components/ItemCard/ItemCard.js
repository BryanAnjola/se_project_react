import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

const ItemCard = ({ data, onSelectCard, onCardLike, isLoggedIn }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = data.likes.some((likes) => likes === currentUser._id);

  const itemLikeButtons = () => {
    return isLiked
      ? "clothing__card-like-button-active"
      : "clothing__card-like-button-inactive";
  };

  return (
    <article className="clothing__cards-wrapper">
      <div
        className="clothing__card-items"
        id={`clothing__card-items_${data.name}`}
      >
        <div className="clothing__card-title-wrapper">
          <p className="clothing-card-title">{data.name}</p>
          {isLoggedIn && (
            <button
              type="button"
              className={itemLikeButtons()}
              onClick={() => {
                onCardLike(data, isLiked);
              }}
            ></button>
          )}
        </div>
        <img
          className="clothing-card-individual"
          id={`clothing-card-individual_${data.name}`}
          alt={data.name}
          src={data.imageUrl}
          onClick={() => onSelectCard(data)}
        />
      </div>
    </article>
  );
};

export default ItemCard;
