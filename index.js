const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("chat message 123", (msg) => {
        console.log("message: " + msg);

        io.emit("chat message 123", msg);
    });

    socket.on("typing", (isTyping) => {
        io.emit("typing", isTyping);
    });

    socket.emit("newclientconnect", { description: "Hey, welcome!" });
    socket.broadcast.emit("newclientconnect", { description: "New User Connected" });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
