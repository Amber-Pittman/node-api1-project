const express = require('express');
const db = require("./database.js")

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.send("Hello World from the API!");
});

server.post("/api/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "Please provide name AND bio for the user.",
        });
    }
     
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    if (newUser) {
        res.status(201).json(newUser);
    } else {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }    
})

server.get("/api/users", (req, res) => {
    const users = db.getUsers(); // get list of users

    if (users) {
        res.json(users);
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
})

server.get("/api/users/:id", (req, res) => {
    const userId = req.params.id
    const user = db.getUserById(userId)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    }

    if (!user) {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
})

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        try {
            db.deleteUser(user.id)
            res.status(204).end()
        } catch (err) { 
            res.status(500).json({
            errorMessage: "The user could not be removed"
            })        
        }
    }

    res.status(404).json({
        message: "The user with the specified ID does not exist."
        
    })
})

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        if (!req.body.name || !req.body.bio) {
            res.status(404).json({
                message: "The user with the specified ID does not exist.",
            });
        }

        const updateUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio,
        });

    if (!updateUser) {
        res.status(500).json({
            errorMessage: "The user information could not be modified."
        })
    }

    res.status(200).json(updateUser);
  }
})



server.listen(5000, () => 
    console.log(`Success! API running on http://localhost:5000`)
);