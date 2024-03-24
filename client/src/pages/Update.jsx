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
      <h1 className="header">Update Wish</h1>
      <input
        type="text"
        className="title"
        placeholder="title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={1.5}
        className="desc"
        type="text"
        placeholder="desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        className="price"
        type="number"
        placeholder="price"
        name="price"
        onChange={handleChange}
      />
      <input
        className="img"
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
      />
      <button className="formButton" onClick={handleClick}>Update</button>
      <Link className="link" to="/">See all wishes</Link>
    </div>
  );
};

export default Update;