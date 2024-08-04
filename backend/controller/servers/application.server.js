"use strict";
const express = require('express');
const application = express();
const http = require('node:http');
const application_server = http.createServer(application);
const WebSocket = require('ws').Server;
const connection = new WebSocket({ port: 4000 });

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

(async function(){
    var path = require('node:path');

    application.use(bodyParser.urlencoded({ extended: false }));
    application.use(express.urlencoded({ extended: false }));
    application.use(bodyParser.json());
    application.use(express.json());
    application.use(cookieParser());
    application.use(cors());
    application.use(express.static(path.join(__dirname, '../../frontend/public')));
}());

(async function(){
    application_server.listen(process.env.port, process.env.host, () => {
        if(!application_server.listening) {
            console.log("application server not running!");
        } else {
            connection.on("connection", (socket) => {
                console.log("connection made to socket server");
                socket.on("message", (message) => {
                    console.log(`received: ${message}`)
                    socket.send(`${message}`);
                });
            });
            
            console.log("application server is running!");
        }
    })
}());