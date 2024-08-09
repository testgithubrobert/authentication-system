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

    var path = require('node:path');

    application.use(bodyParser.urlencoded({ extended: false }));
    application.use(express.urlencoded({ extended: false }));
    application.use(bodyParser.json());
    application.use(express.json());
    application.use(cookieParser());
    application.use(cors());
    application.use(express.static(path.join(__dirname, '../../../frontend/public')));

const ErrorControllerMiddleware = require('../middleware/error/404.middleware.controller');

application.use('/sample.com', require('../routers/application.router'));
    application.use(ErrorControllerMiddleware);
    
require("dotenv").config();
require("dotenv").configDotenv();
    application_server.listen(process.env.port || 4000, process.env.host || "localhost", () => {
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