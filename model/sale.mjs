import * as Data from '../app/data.mjs';


export function check(code_item){
    return new Promise((resolve, reject) => {
        
        const xhr = new XMLHttpRequest();
        const endpoint =  Data.routeApiCheck + code_item;
        xhr.open('GET', endpoint);
        xhr.setRequestHeader('Api-token', Data.apiToken);
        xhr.setRequestHeader('Authorization', 'Bearer ' + Data.apiAuthenticatedUser);
        xhr.setRequestHeader('ngrok-skip-browser-warning', 'true');

        xhr.onload = function(){
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else { 
                reject(`sistem ditolak: ${xhr.status} ${xhr.responseText}`);
            }
        }
        xhr.onerror = function(){
            reject("Failed Fetch api");
        }
        xhr.send();
    });
    
}