import * as Data from '../app/data.mjs';

function isAuthenticated() {
    const token = localStorage.getItem('pat'); // Token di localStorage
    if(!token){
        window.location.href = Data.routeViewLogin;
        return;
    }
    const data = JSON.stringify({'token': token });
    Data.check(data).then(response =>{
            if(!response){
                window.location.href = Data.routeViewLogin; // Arahkan ke halaman login
            }
    }).catch(error => {
       console.log(error);
    }); 
}

// Panggil fungsi ini di setiap halaman yang perlu dilindungi
isAuthenticated();