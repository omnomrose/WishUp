import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [wish, setWish] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        setWish(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };
    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/wishlist", wish)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }
    console.log(wish);
    return (
        <div className='form'>
            <h1 className="header">Add Wish</h1>
            <input className="title" type="text" placeholder='title' onChange={handleChange} name="title" />
            <input className="desc" type="text" placeholder='desc' onChange={handleChange} name="desc" />
            <input className="price" type="number" placeholder='price' onChange={handleChange} name="price" />
            <input className="img1" type="text" placeholder='image link' onChange={handleChange} name="cover" />
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add