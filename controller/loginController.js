import {login} from '../model/login.mjs';

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const submit = document.querySelector('#submit');

const emailEr = document.querySelector('#email-error');
const passwordEr = document.querySelector('#password-error');
const accountEr = document.querySelector('#account-error');


submit.addEventListener('click', function(event){
    event.preventDefault(); 
    login({
        'email': email.value,
        'password': password.value
    }).then(dataError=>{
        const data = dataError;
        if (data.errors) {
            emailEr.textContent = data.errors.email;
            passwordEr.textContent = data.errors.password;
        }else{
            accountEr.textContent = data.message
        }
    }).catch(error => {
        console.log('Error', error);
    });
});