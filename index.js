const express = require('express');

const server = express();

server.get("/", (req, res) => {
    res.send("Hello World from Express!");
});

server.listen(5000, () => 
    console.log(`Success! API running on http://localhost:5000`)
);