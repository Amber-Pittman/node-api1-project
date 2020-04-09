const express = require("express");
const port = 5000;

const server = express();

server.get("/", (req, res) => {
    res.send("Hello World from Express!");
});

server.listen(port, () => 
    console.log(`Success! Server listening on http://localhost:${port}`)
);