// Item.js
import DefaultContext from "../../context/DefaultContext";
import "./index.css";

const Item = (props) => {
  const { itemDetails } = props;
  const { name, price, image, category, isAvailable } = itemDetails;

  return (
    <DefaultContext.Consumer>
      {(value) => {
        const { addToCart } = value;
        const onAdd = () => {
          alert("Item Added to Cart!")
          addToCart({ ...itemDetails, quantity: 1 });
        };

        return (
          <li className="item-card">
            <img src={image} alt={name} className="item-image" />
            <div className="item-info">
              <h1 className="item-name">{name}</h1>
              <div className="price-container">
                <span className="currency">₹</span>
                <span className="price">{price}</span>
                <span className="original-price">₹ 39.99</span>
              </div>
              <span className="item-category">{category}</span>
              <button
                type="button"
                className={`add-to-cart-button ${!isAvailable && "disabled"}`}
                onClick={isAvailable ? onAdd : null}
                disabled={!isAvailable}
              >
                {isAvailable ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </li>
        );
      }}
    </DefaultContext.Consumer>
  );
};

export default Item;
