"use strict";
const express = require('express');
const ErrorControllerMiddleware = require('../middleware/error/404.middleware.controller');
const router = express.Router();
const path = require('node:path');
const JWTVerificationMiddleware = require('../middleware/jwt/jwt.verification.middleware');

router.route("/").get(JWTVerificationMiddleware, async (request, response) => {
    response.contentType = "text/html";
    response.statusCode = 200;

    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../frontend/view/main.html')), 1000);
}).post(async (request, response) => {
    LoginMiddleware(request, response);
});

// register or signup an accounts
const SignUpMiddleware = require('../authentication/signup/authorization.signup');
router.route("/signup").get((request, response) => {
    response.contentType = "text/html";
    response.statusCode = 200;

    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../frontend/view/signup.html')), 1000);
}).post(async (request, response) => {
    SignUpMiddleware(request, response);
});

// loing or sign into account
const LoginMiddleware = require('../authentication/login/authorization.login');
router.route("/login").get((request, response) => {
    response.contentType = "text/html";
    response.statusCode = 200;

    global.setTimeout(() => response.sendFile(path.join(__dirname, '../../../frontend/view/login.html')), 1000);
});

router.use(ErrorControllerMiddleware);
module.exports = router;