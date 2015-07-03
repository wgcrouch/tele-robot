"use strict";

var path = require("path");
var app = require("express")();
var server = require("http").Server;
var http = server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", function(socket) {
    console.log("a user connected");
    io.emit('user-connected', { ip: socket.handshake.address });
    socket.on("disconnect", function() {
        io.emit('user-disconnected', { ip: socket.handshake.address });
        console.log("user disconnected");
    });

    socket.on('move', function(data) {
        console.log('move', data);
        io.emit('move', data);
    });
});

http.listen(3000, function() {
    console.log("listening on *:3000");
});
