"use strict";
const mysql2 = require('mysql2');

const pool_connection = mysql2.createPool({
    host: process.env.host,
    user: "root",
    database: "authenticationDB",
    password: "0709449425robert"
}).promise();


module.exports = pool_connection;