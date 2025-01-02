import {login} from '../model/login.mjs';

const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;
const submit = document.querySelector('#submit');

console.log('test')


submit.addEventListener('click', function(event){
    event.preventDefault(); 
    login({
        'email': email,
        'password': password
    }).then((dataError)=>{
        
    }).catch((error) => {

    });
});