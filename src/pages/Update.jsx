import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Update =() =>{
    const [wish, setWish] = useState({
        title:"",
        desc:"",
        price: null,
        cover:"",
    })

    const navigate = useNavigate()
    const handleChange = (e) =>{
        setWish(prev=>({...prev, [e.target.name]: e.target.value}))
    };
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/wishlist", wish)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }
    console.log(wish);
    return(
        <div className='form'>
            <h1>Update Wish</h1>
            <input type="text" placeholder='title'  onChange={handleChange} name="title"/>
            <input type="text" placeholder='desc' onChange={handleChange} name="desc"/>
            <input type="number" placeholder='price' onChange={handleChange} name="price"/>
            <input type="text" placeholder='cover' onChange={handleChange} name="cover"/>
            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update