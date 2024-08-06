"use strict";
const jwt = require('jsonwebtoken');
const configurations = require('../../../model/configurations/model.configurations.json');

const JWTVerificationMiddleware = async (request, response, next) => {
    try {
        const AuthorizationHeaders = request.headers['authorization'];
        const token = AuthorizationHeaders.split('')[1];

        if(!token) response.sendStatus(401);
        jwt.verify(token, configurations[0]['secrete-key'], (error, user) => { request.body = user });
        next();
    } catch (error) {
        response.sendStatus(401)
    }
}

module.exports = JWTVerificationMiddleware;