import * as Data from '../app/data.mjs';

export function register(data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', Data.routeRegister, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Api-token', Data.apiToken);
        xhr.onload = function() {
            const fetchData = JSON.parse(xhr.response);
            if(!fetchData.status){
                resolve(fetchData);
                return;
            }
            window.location.href = Data.routeViewLogin;
        };
        xhr.onerror = function() {
            reject(new Error('Network error'));
        };
        xhr.send(JSON.stringify(data));
    });
}