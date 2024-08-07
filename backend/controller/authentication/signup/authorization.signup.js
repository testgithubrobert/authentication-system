"use strict";
const pool_connection = require('../../../model/connection/model.connection');
const bcrypt = require('bcrypt');
const { v4:uuid } = require('uuid');

async function SignUpMiddleware() {
    arguments[1].contentType = "text/html";
    arguments[1].statusCode = 201;

    // register and store 
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(`${arguments[0].body.password}`, salt);
    var accounts = await pool_connection.query("SELECT * FROM accounts");
    const AlreadyExistingAccount = accounts[0].find((account) => { return account.email === arguments[0].body.email })
    
    try {
        if(arguments[0].body.password.length < 10) {
            global.setTimeout(() => arguments[1].status(400).json({ "message": "password not strong" }), 1000);
        } else if(!arguments[0].body.email){
            global.setTimeout(() => arguments[1].status(400).json({ "message": "email is undefined!" }), 1000);
        } else if(AlreadyExistingAccount) {
            global.setTimeout(() => arguments[1].status(400).json({ "message": "email already in use!" }), 1000);
        } else {
            await pool_connection.query(`INSERT INTO accounts VALUES(
                ${JSON.stringify(uuid())}, ${JSON.stringify(arguments[0].body.first_name)}, ${JSON.stringify(arguments[0].body.last_name)}, ${JSON.stringify(arguments[0].body.email)}, ${JSON.stringify(hash)}
            )`);
            global.setTimeout(() => arguments[1].status(201).redirect("/sample.com/login"), 1000);
        }
    } catch(error) {
        console.log(error);
        global.setTimeout(() => arguments[1].status(400).json({ "message": "bad request!" }), 1000);
    } finally {
        console.log('user added')
    }
}

module.exports = SignUpMiddleware;