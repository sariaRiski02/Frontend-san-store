import * as Data from '../app/data.mjs';



export function listCategory(){
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', Data.routeApiCategory);
        xhr.setRequestHeader('Authorization', 'Bearer ' + Data.apiAuthenticatedUser);
        xhr.setRequestHeader('Api-token', Data.apiToken);
        xhr.setRequestHeader('ngrok-skip-browser-warning', 'true');  // Menambahkan header untuk melewati peringatan
        xhr.onload = function(){
            resolve(xhr.response);
        }
        xhr.onerror = function(){
            reject("Error get data from api");
        }
        xhr.send();
    });
}

export function addProduct(data){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('POST', Data.routeApiAddProduct, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Api-token', Data.apiToken);
        xhr.setRequestHeader('Authorization', 'Bearer ' + Data.apiAuthenticatedUser);
        xhr.onload = function() {
            try {
            const response = JSON.parse(xhr.response);
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(response);
            } else {
                reject(response);
            }
            } catch (error) {
            console.error('Error parsing JSON:', xhr.response);
            reject('Error parsing JSON');
            }
        }
        xhr.onerror = function() {
            reject('Network error');
        };
        xhr.send(JSON.stringify(data));
    });
}

export function editProduct(data){}


