import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [wish, setWish] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const wishId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setWish((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      await axios.put(`http://localhost:8800/wishlist/${wishId}`, wish);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Update Wish</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
      />
      <button className="formButton" onClick={handleClick}>Update</button>
      <Link to="/">See all wishes</Link>
    </div>
  );
};

export default Update;