"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// handle links
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const navbarLinksOne = window.document.createElement('a');
        const navbarLinksTwo = window.document.createElement('a');
        const logOut = window.document.createElement('a');
        navbarLinksOne.href = "/sample.com/signup";
        navbarLinksTwo.href = "/sample.com/login";
        logOut.href = "/sample.com/login";
        navbarLinksOne.title = navbarLinksOne.href;
        navbarLinksTwo.title = navbarLinksTwo.href;
        logOut.title = navbarLinksTwo.href;
        navbarLinksOne.textContent = 'signup';
        navbarLinksTwo.textContent = 'login';
        logOut.textContent = 'logout';
        (_a = window.document.querySelector('nav')) === null || _a === void 0 ? void 0 : _a.append(navbarLinksOne, navbarLinksTwo, logOut);
    });
}());
const connection = new WebSocket("ws:/localhost:4000");
connection.addEventListener("open", () => connection.send("connection made."));
connection.addEventListener("message", (message) => console.log(message.data));
connection.addEventListener("error", (error) => console.log(error));
connection.addEventListener("close", () => console.log("connection closed"));
