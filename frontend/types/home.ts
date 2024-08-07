// handle links
(async function(){
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

    window.document.querySelector('nav')?.append(navbarLinksOne, navbarLinksTwo, logOut);
}());

const connection = new WebSocket("ws://localhost:8000");
connection.addEventListener("open", () => connection.send("connection made."));
connection.addEventListener("message", (message: any) => console.log(message.data));
connection.addEventListener("error", (error: any) => console.log(error));
connection.addEventListener("close", () => console.log("connection closed"));