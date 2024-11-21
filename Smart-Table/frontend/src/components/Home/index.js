// Home.js
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import Item from "../Item";
import "./index.css";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getItem")
      .then((response) => setItems(response.data))
      .catch((err) => console.error("Failed to fetch items:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="home">
        <h1 className="home-title">Explore Our Menu</h1>
        <div className="items-grid">
          {items.map((item) => (
            <Item itemDetails={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
