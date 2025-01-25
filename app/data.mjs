
export const apiToken = 'san-store-1980';
const Authorization = localStorage.getItem('pat');
export const apiAuthenticatedUser = 'Bearer ' + Authorization ?? '';

// URL api

export const urlApi = 'https://san-store.my.id/api/';
export const routeApiRegister = urlApi + 'register';
export const routeApiLogin = urlApi + 'login';
export const routeApiAddProduct = urlApi + 'product';
export const routeApiCategory = urlApi + 'category';
export const routeApiCheck = urlApi + 'sales/check/';
export const routeApiGetProduct = urlApi + 'product/';
export const routeApiUpdateProduct = urlApi + 'product/';
export const routeApiCheckUser = urlApi + 'user/check';

// URL view
function getCurrentDomain() {
    const url = new URL(window.location.href);
    return url.origin;
}
export const routeView = getCurrentDomain() + '/view/'
export const routeViewLogin = routeView + 'login.html';
export const routeViewSale = routeView + 'sales.html';
export const routeViewEditProduct = routeView + 'product-edit.html';
export const routeViewDenied = routeView + 'denied.html';

export function check(token){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', routeApiCheckUser);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Api-token', apiToken);
        xhr.setRequestHeader('ngrok-skip-browser-warning', 'true'); 
        xhr.onload = function(){
           resolve(xhr.response);
        }
        xhr.send(token);
    });
}