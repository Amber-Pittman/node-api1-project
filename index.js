const express = require('express');
const db = require("./database.js")

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.send("Hello World from the API!");
});

server.get("/api/users", (req, res) => {
    const users = db.getUsers(); // get list of users
    res.json(users);
})

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

server.get("/api/users/:id", (req, res) => {
    const userId = req.params.id
    const user = db.getUserById(userId)

    if (user) {
        res.json(user)
    } else {
        res.status(500).json({
            message: "User not found",
        })
    }
})

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const updateUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio,
        })
        res.json(updateUser)
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
})

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "User not found - can't delete"
        })
    }
})

server.listen(5000, () => 
    console.log(`Success! API running on http://localhost:5000`)
);