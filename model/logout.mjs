import * as Data from '../app/data.mjs';

export function logout(){
    const token = localStorage.getItem('pat');
    if(!token){
        window.location.href = Data.routeViewLogin;
        return;
    }
    Data.check(JSON.stringify({'token': token}))
        .then(response => {
            if(response){
                localStorage.removeItem('pat');
                window.location.href = Data.routeViewLogin;
            }
        }).catch(error => {
            alert("terjadi kesalahan");
        });
        localStorage.removeItem('pat');
}