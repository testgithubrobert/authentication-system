const password: HTMLInputElement = window.document.querySelector("#password") as HTMLInputElement;
const PasswordIndicatorsStrength: HTMLSpanElement = window.document.querySelector("#indicator") as HTMLSpanElement;

password.addEventListener("input", (event: any) => {
    if(password.value.length < 10) {
        PasswordIndicatorsStrength.style.color = 'red';
        PasswordIndicatorsStrength.textContent = 'Password is weak!'
    } else {
        PasswordIndicatorsStrength.style.color = 'green';
        PasswordIndicatorsStrength.textContent = 'Password is strong!'
    }
});