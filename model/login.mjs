import * as Data from '../app/data.mjs';

export function login(data){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('POST', Data.routeApiLogin, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Api-token', Data.apiToken);
        xhr.onload = function(){
            try{
                const fetchData = JSON.parse(xhr.responseText);
                if(fetchData){
                    resolve(fetchData);
                    return;
                }else{
                    reject('error');
                }
            }catch(error){
                reject(error);
            }
        }
        xhr.onerror = function(){
            reject('Network Error');
        }
        xhr.send(JSON.stringify(data));
    });
}