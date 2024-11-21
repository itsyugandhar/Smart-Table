import { useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import CartItem from "../CartItem";
import DefaultContext from "../../context/DefaultContext";
import "./index.css";

const Cart = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [tableNo, setTableNo] = useState("");
  const [error, setError] = useState("");

  return (
    <DefaultContext.Consumer>
      {(value) => {
        const { cartItems, addToOrders, orders } = value;

        const placeOrder = async () => {
          if (!name || !phone || !msg || !tableNo) {
            setError("Please fill out all fields before placing the order.");
            return;
          }
          addToOrders(cartItems, name, phone, msg, tableNo);

          const newOrder = {
            customerDetails: { name, phone, msg },
            cartItems: [...cartItems],
          };

          try {
            const response = await axios.post(
              "http://localhost:3001/orders",
              newOrder
            );
            alert(response.data.message);
          } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order");
          }
        };

        const calculateTotalBill = () => {
          return cartItems.reduce((total, item) => {
            const itemTotal = (item.price || 0) * (item.quantity || 1);
            return total + itemTotal;
          }, 0);
        };

        const totalBill = calculateTotalBill();

        return (
          <>
            <Navbar />
            <div className="cart-container">
              {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty</p>
              ) : (
                <div className="cart-content">
                  <h2 className="cart-title">Your Cart Items</h2>
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Price (₹)</th>
                        <th>Quantity</th>
                        <th>Total (₹)</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((eachItem) => (
                        <CartItem
                          cartItemDetails={eachItem}
                          key={eachItem._id}
                        />
                      ))}
                      <tr className="total-row">
                        <td colSpan="3" className="total-label">
                          Total Bill:
                        </td>
                        <td className="total-amount">₹{totalBill}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="order-details-form">
                    <h3 className="order-details-title">Order Details</h3>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="order-input"
                    />
                    <input
                      type="number"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="order-input"
                    />
                    <input
                      type="number"
                      placeholder="Table No"
                      value={tableNo}
                      onChange={(e) => setTableNo(e.target.value)}
                      className="order-input"
                    />
                    <textarea
                      placeholder="Message or Special Instructions"
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      className="order-input order-textarea"
                    />
                    {error && <p className="error-message">{error}</p>}

                    <button
                      type="button"
                      className="place-order-btn"
                      onClick={placeOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="orders-container">
              <h2 className="orders-title">Previous Orders</h2>
              {orders.length === 0 ? (
                <p>No orders yet</p>
              ) : (
                orders.map((order, index) => {
                  // Calculate the total bill for each order
                  const orderTotalBill = order.cartItems.reduce((total, item) => {
                    return total + (item.price * item.quantity);
                  }, 0);

                  return (
                    <div className="order-card" key={index}>
                      <div className="order-header">
                        <h3>Order #{index + 1}</h3>
                      </div>
                      <div className="order-items">
                        {order.cartItems.map((item) => (
                          <div className="order-item" key={item._id}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="order-item-image"
                            />
                            <div className="order-item-details">
                              <p>{item.name}</p>
                              <p>Category: {item.category}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Price: ₹{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="order-footer">
                        <p>Total Bill: ₹{orderTotalBill}</p> {/* Display the calculated total for each order */}
                        <p>Message: {order.customerDetails.msg}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        );
      }}
    </DefaultContext.Consumer>
  );
};

export default Cart;
