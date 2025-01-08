import * as Data from '../app/data.mjs';

export function login(data){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('POST', Data.routeApiLogin, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Api-token', Data.apiToken);
        xhr.onload = function(){
            const fetchData = JSON.parse(xhr.responseText);
            if(!fetchData.status){
                resolve(fetchData);
                return;
            }
            // window.location.href = Data.routeViewSale;
            document.cookie = `token=${fetchData.token}; path=/; secure; SameSite=Strict`;
        }
        xhr.onerror = function(){
            reject('Network Error');
        }
        xhr.send(JSON.stringify(data));
    });
}