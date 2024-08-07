"use strict";
const pool_connection = require('../../../model/connection/model.connection');
const bcrypt = require('bcrypt');
const { v4:uuid } = require('uuid');
const path = require('node:path');
const jwt = require('jsonwebtoken');

async function LoginMiddleware() {
    arguments[1].contentType = "text/html";
    arguments[1].statusCode = 201;

    const accounts = await pool_connection.query("SELECT * FROM accounts");
    var FoundAccount = accounts[0].find((account) => { return account.email === arguments[0].body.email });
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(`${arguments[0].body.password}`, salt);
    
    try {
        let match = await bcrypt.compare(`${arguments[0].body.password}`, FoundAccount.password);
        // make jwts
        if(typeof FoundAccount === 'undefined' || !arguments[0].body.email.includes("@gmail.com")) {
            global.setTimeout(() => arguments[1].status(401).json({ "message": `No such account ${arguments[0].body.email} was not found!` }), 1000);
        } else if(match === false) {
            global.setTimeout(() => arguments[1].status(401).json({ "message": `password does not match account ${arguments[0].body.email} account!` }), 1000);
        } else {
            // const token = jwt.sign(arguments[0].body, 'secrete-key', { expiresIn: '1day' });
            await pool_connection.query(`INSERT INTO logins VALUES(
                ${JSON.stringify(uuid())}, ${JSON.stringify(arguments[0].body.email)}, ${JSON.stringify(hash)})`);
            global.setTimeout(() => arguments[1].status(201).sendFile(path.join(__dirname, '../../../../frontend/view/main.html')), 1000);
        }
    } catch(error) {
        // console.log(error);
        global.setTimeout(() => arguments[1].status(401).json({ "message": `No such account ${arguments[0].body.email} was not found, or password incorrect!` }), 1000);
    } 
};

module.exports = LoginMiddleware;