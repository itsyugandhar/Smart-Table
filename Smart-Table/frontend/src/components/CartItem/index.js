// CartItem.js
import { MdDelete } from "react-icons/md";

import DefaultContext from "../../context/DefaultContext";

import "./index.css";

const CartItem = (props) => {
  let { cartItemDetails } = props;
  const { _id, name, price, quantity} = cartItemDetails;

  const calculateTotalPrice = (price, quantity) => price * quantity;

  return (
    <DefaultContext.Consumer>
      {(value) => {
        const { removeItem , decrementCartItemQuantity, incrementCartItemQuantity} = value;

        const handleDecrement = () => {
          decrementCartItemQuantity(_id)
        };

        const handleIncrement = () => {
          incrementCartItemQuantity(_id)
        };

        const onDeleteItem = () => {
          removeItem(_id);
        };


        return (
          <>
            <tr className="cart-item-row">
              <td className="cart-item-name">{name}</td>
              <td className="cart-item-price">₹{price}</td>
              <td className="cart-item-quantity">
                <div className="quantity-container">
                  <button className="quantity-btn" onClick={handleDecrement}>
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button className="quantity-btn" onClick={handleIncrement}>
                    +
                  </button>
                </div>
              </td>
              <td className="cart-item-total">
                ₹{calculateTotalPrice(price, quantity)}
              </td>
              <td>
                <button
                  type="button"
                  className="remove-button"
                  onClick={onDeleteItem}
                >
                  <MdDelete size="20px" />
                </button>
              </td>
            </tr>
          </>
        );
      }}
    </DefaultContext.Consumer>
  );
};

export default CartItem;
