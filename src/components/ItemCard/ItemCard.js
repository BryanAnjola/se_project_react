const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img
          src={item.link}
          alt="clothing"
          className="card__image"
          onClick={() => onSelectCard(item)}
        />
      </div>
      <h2 className="card__name">{item.name}</h2>
    </div>
  );
};

export default ItemCard;
