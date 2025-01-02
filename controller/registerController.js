import { register } from '../model/register.mjs';

const name = document.querySelector('#username');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const confirm_password = document.querySelector('#confirm_password');
const registration_code = document.querySelector('#registration_code');
const submit = document.querySelector('#submit');

const nameEr = document.querySelector('#username-error');
const emailEr = document.querySelector('#email-error');
const passwordEr = document.querySelector('#password-error');
const confirmPasswordEr = document.querySelector('#confirm_password-error');
const registrationCodeEr = document.querySelector('#registration_code-error');

submit.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the page from reloading
    register({
        'name': name.value,
        'email': email.value,
        'password': password.value,
        'password_confirmation': confirm_password.value,
        'registration_code': registration_code.value,
    }).then(dataError => {
        const data = dataError.errors;
        nameEr.textContent = data.name;
        emailEr.textContent = data.email;
        passwordEr.textContent = data.password;
        confirmPasswordEr.textContent = data.password;
        registrationCodeEr.textContent = data.registration_code;
    }).catch(error => {
        console.error('Error:', error);
    });
});
