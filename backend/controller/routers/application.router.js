"use strict";
const express = require('express');
const ErrorControllerMiddleware = require('../middleware/error/404.middleware.controller');
const router = express.Router();
const path = require('node:path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool_connection = require('../../model/connection/model.connection');
const { v4:uuid } = require('uuid');
const JWTVerificationMiddleware = require('../middleware/jwt/jwt.verification.middleware');

router.route("/").get(JWTVerificationMiddleware, (request, response) => {
    response.contentType = "text/html";
    response.statusCode = 200;

    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../frontend/view/main.html')), 1000);
});

router.route("/signup").get((request, response) => {
    response.contentType = "text/html";
    response.statusCode = 200;

    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../frontend/view/signup.html')), 1000);
}).post(async (request, response) => {
    response.contentType = "text/html";
    response.statusCode = 201;

    // register and store 
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(`${request.body.password}`, salt);
    var accounts = await pool_connection.query("SELECT * FROM accounts");
    const AlreadyExistingAccount = accounts[0].find((account) => { return account.email === request.body.email })
    
    try {
        if(request.body.password.length < 10) {
            global.setTimeout(() => response.status(400).json({ "message": "password not strong" }), 1000);
        } else if(!request.body.email){
            global.setTimeout(() => response.status(400).json({ "message": "email is undefined!" }), 1000);
        } else if(AlreadyExistingAccount) {
            global.setTimeout(() => response.status(400).json({ "message": "email already in use!" }), 1000);
        } else {
            await pool_connection.query(`INSERT INTO accounts VALUES(
                ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.first_name)}, ${JSON.stringify(request.body.last_name)}, ${JSON.stringify(request.body.email)}, ${JSON.stringify(hash)}
            )`);
            global.setTimeout(() => response.status(201).redirect("/sample.com/login"), 1000);
        }
    } catch(error) {
        console.log(error);
        global.setTimeout(() => response.status(400).json({ "message": "bad request!" }), 1000);
    } finally {
        console.log('user added')
    }
});

// loing or sign into account
router.route("/login").get((request, response) => {
    response.contentType = "text/html";
    response.statusCode = 200;

    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../frontend/view/login.html')), 1000);
}).post(async (request, response) => {
    response.contentType = "text/html";
    response.statusCode = 201;

    const accounts = await pool_connection.query("SELECT * FROM accounts");
    var FoundAccount = accounts[0].find((account) => { return account.email === request.body.email });
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(`${request.body.password}`, salt);
    
    try {
        let match = await bcrypt.compare(`${request.body.password}`, FoundAccount.password);
        // make jwts
        if(!FoundAccount) {
            global.setTimeout(() => response.status(401).json({ "message": `No such account ${request.body.email} was not found!` }), 1000);
        } else if(match === false) {
            global.setTimeout(() => response.status(401).json({ "message": `password does not match account ${request.body.email} account!` }), 1000);
        } else {
            await pool_connection.query(`INSERT INTO logins VALUES(${JSON.stringify(uuid())}, ${JSON.stringify(request.body.email)}, ${JSON.stringify(hash)})`);
            global.setTimeout(() => response.status(201).redirect("/sample.com"), 1000);
        }
    } catch(error) {
        console.log(error);
        global.setTimeout(() => response.status(401).json({ "message": `No such account ${request.body.email} was not found!` }), 1000);
    } 
})

router.use(ErrorControllerMiddleware);
module.exports = router;