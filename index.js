const express = require('express');
const db = require("./database.js")

const server = express();
server.use(express.json());

server.get("/api", (req, res) => {
    res.send("Hello World from the API!");
});

server.post("/api/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            message: "Need a name AND a bio",
        })
    }

    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })
    res.status(201).json(newUser)
})

server.listen(5000, () => 
    console.log(`Success! API running on http://localhost:5000`)
);