"use strict";
const path = require('node:path');

async function ErrorControllerMiddleware(request, response) {
    response.contentType = "text/html";
    response.statusCode = 404;

    if(request) {
        global.setTimeout(() => response.status(404).sendFile(path.join(__dirname, '../../../../frontend/view/404.html')))
    } else return;
}

module.exports = ErrorControllerMiddleware;