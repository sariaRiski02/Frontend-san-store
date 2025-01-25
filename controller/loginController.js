import * as Login from '../model/login.mjs';
import * as Data from '../app/data.mjs';
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const submit = document.querySelector('#submit');

const emailEr = document.querySelector('#email-error');
const passwordEr = document.querySelector('#password-error');
const accountEr = document.querySelector('#account-error');

// personal access token (pat)
function setSession(pat){
    localStorage.setItem('pat', pat);
}

submit.addEventListener('click', function(event){
    event.preventDefault(); 
    Login.login({
        'email': email.value,
        'password': password.value
    }).then(response=>{
        // alert(JSON.stringify(response));
        if (!response.status && response.message !== undefined) {
            accountEr.textContent = response.message;
            return;
        }
        if(!response.status && response.errors !== undefined){
            emailEr.textContent = response.errors.email;
            passwordEr.textContent = response.errors.password;
            return;
        } 
        setSession(response.token);
        window.location.href = Data.routeViewSale;
        
    }).catch(error => {
        console.log('Error', error);
    });
});