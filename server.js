const express = require("express");
const { Client } = require("pg");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
/* PostgreSQL connection */
require("dotenv").config();

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


client.connect()
    .then(() => console.log("Connected to PostgreSQL "))
    .catch(err => console.error("Connection error ", err));

app.get("/songs", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM songs");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching songs");
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    
});
