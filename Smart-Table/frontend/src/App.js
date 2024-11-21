import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./components/Home";
import Cart from "./components/Cart";
import DefaultContext from "./context/DefaultContext";
import "./App.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (item) => {
    // Check if the item is already in the cart based on unique _id
    const isPresent = cartItems.some((eachItem) => eachItem._id === item._id);

    if (isPresent) {
      alert("Item is already present in the cart");
    } else {
      setCartItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeItem = (id) => {
    const filterdCart = cartItems.filter((eachItem) => eachItem._id !== id);
    setCartItems(filterdCart);
  };

  const addToOrders = (cartItems,name, phone, msg) => {
    const newOrder = {
      customerDetails : {
        name,
        phone,
        msg
      },
      cartItems
    }
    setOrders(prevOrders => [...prevOrders, newOrder]);
    setCartItems([])
  };

  console.log(orders)

  const incrementCartItemQuantity = (id) => {
    console.log("--------- increment triggered");
    setCartItems((prevItems) =>
      prevItems.map((eachCartItem) =>
        eachCartItem._id === id && (eachCartItem.quantity || 1) < 10
          ? { ...eachCartItem, quantity: (eachCartItem.quantity || 1) + 1 }
          : eachCartItem
      )
    );
  };
  
  const decrementCartItemQuantity = (id) => {
    console.log("--------- decrement triggered");
    setCartItems((prevItems) =>
      prevItems.map((eachCartItem) =>
        eachCartItem._id === id && (eachCartItem.quantity || 1) > 1
          ? { ...eachCartItem, quantity: (eachCartItem.quantity || 1) - 1 }
          : eachCartItem
      )
    );
  };
  

  return (
    <DefaultContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        orders,
        addToOrders,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </DefaultContext.Provider>
  );
};

export default App;
