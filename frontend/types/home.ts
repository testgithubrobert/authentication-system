// add title to the links, and the titles must equal = links.href
// handle navbar links
// (async function(){
//     const navbarLinks = Array.from(window.document.querySelectorAll('#nav-bar-links'));
//     navbarLinks.forEach((link) => link.title = link.href);
// }());

// // handle header links
// (async function(){
//     const headerLinks = Array.from(window.document.querySelectorAll('#header-links'));
//     headerLinks.forEach((link) => link.title = link.href);
// }());

const connection = new WebSocket("ws:/localhost:4000");
connection.addEventListener("open", () => connection.send("connection made."));
connection.addEventListener("message", (message: any) => console.log(message.data));
connection.addEventListener("error", (error: any) => console.log(error));
connection.addEventListener("close", () => console.log("connection closed"));




