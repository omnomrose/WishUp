import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Wishlist = () => {
    const [wishes, setWishes] = useState([]);

    useEffect(() => {
        const fetchAllWishes = async () => {
            try {
                const res = await axios.get("http://localhost:8800/wishlist");
                setWishes(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllWishes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/wish/${id}`);
            setWishes(prevWishes => prevWishes.filter(wish => wish.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>

            <h1 className="header">wishup</h1>
            <div className="nav">
                <h3 className="link">discover</h3>
                <h3 className="linkActive">my list</h3>
                <h3 className="link">friends</h3>
            </div>
            <div className="wishes">
                {wishes.map(wish => (
                    <div className="wish" key={wish.id}>
                        {wish.cover && <img className="img" src={wish.cover} alt="" />}
                        <h2 className="title">{wish.title}</h2>
                        <p className="desc">{wish.desc}</p>
                        <span className="price">{wish.price}</span>
                        <button className="delete" onClick={() => handleDelete(wish.id)}>Delete</button>
                        <button className="update"><Link className="updateText" to={`/update/${wish.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button className="add"><Link className="addText" to="/add">Add wish</Link></button>
        </div>
    );
};

export default Wishlist;
