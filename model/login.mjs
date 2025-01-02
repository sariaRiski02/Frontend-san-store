import * as Data from '../app/data.mjs';

export function login(){
    return new Promise((reject, resolve)=>{
        const xhr = XMLHttpRequest();
        xhr.open('POST', Data.routeLogin, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Api-token', Data.apiToken);
        xhr.onload = function(){
            const fetchData = JSON.parse(xhr.response);
            if(!fetchData.status){
                resolve(fetchData);
                return;
            }
            window.location.href = Data.routeViewSale;
        }

        
    });
}