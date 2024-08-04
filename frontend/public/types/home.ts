"use strict";

import { log } from "console";

async function enableCookies(){
    if(!(navigator.cookieEnabled === false)) {
        alert('cookies are not enabled!')
    } else {
        console.log(window.document.cookie)
    }
}


type cookieStructure = { get(): void }
const getCookies: Readonly<Pick<cookieStructure, 'get'>> = {
    get() {
        try {    
             // get user gmail from cookies 
            const cookieArray: string[] = window.document.cookie.split('=')
            cookieArray[3].split('%');
            const loggedInUserEmail: string = decodeURIComponent(cookieArray[3]);
            const emailSpan: HTMLSpanElement =  window.document.querySelector('.logged-in-user-email') as HTMLSpanElement;
    
           typeof cookieArray === 'undefined' ? emailSpan.innerHTML = `You are not signed into this page, <a href="http://localhost:3000/example.com/register?page=register&method=post">click here to create new account</a>` :  emailSpan.textContent = `Welcome ${loggedInUserEmail as string} to our dashboard page`;
        } catch (error) {
            console.log(error);
            // get user gmail from cookies 
            const emailSpan: HTMLSpanElement =  window.document.querySelector('.logged-in-user-email') as HTMLSpanElement;

            emailSpan.innerHTML = `You are not signed into this page, <a href="http://localhost:3000/example.com/register?page=register&method=post">click here to create new account</a>`;
        }
    }
}

getCookies.get()