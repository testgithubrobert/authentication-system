"use strict";
const password = window.document.querySelector("#password");
const PasswordIndicatorsStrength = window.document.querySelector("#indicator");
password.addEventListener("input", (event) => {
    if (password.value.length < 10) {
        PasswordIndicatorsStrength.style.color = 'red';
        PasswordIndicatorsStrength.textContent = 'Password is weak!';
    }
    else {
        PasswordIndicatorsStrength.style.color = 'green';
        PasswordIndicatorsStrength.textContent = 'Password is strong!';
    }
});
