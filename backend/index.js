import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "wishie123",
    database: "wishup"
});

app.get("/", (req, res) => {
    res.json("Hello this is the backend!")
})

app.get("/wishlist", (req, res) => {
    const q = "SELECT * FROM wishlist";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/wishlist", (req, res) => {
    const q = "INSERT INTO wishlist (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Added to Wishlist!")
    })
})

app.delete("/wish/:id", (req, res) => {
    const wishId = req.params.id;
    const q = "DELETE FROM wishlist WHERE id = ?"
    db.query(q, [wishId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Wish has been removed!")
    })
})

app.put("/wishlist/:id", (req, res) => {
    const wishId = req.params.id;
    const q = "UPDATE wishlist SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id =?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]
    db.query(q, [...values, wishId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Updated wish!")
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!")
})