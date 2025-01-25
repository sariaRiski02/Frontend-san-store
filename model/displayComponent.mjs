import * as Data from '../app/data.mjs';

export function displayComponent() {
    
    // button for mobile
    const checkPriceMob = document.querySelector('#check-price-mob');
    const addProductMob = document.querySelector('#add-product-mob');
    const signInMob = document.querySelector('#sign-in-mob');
    const registerMob = document.querySelector('#register-mob');
    const logoutMob = document.querySelector('#logout-mob');

    
    // button for desktop
    const checkAndAddDesk = document.querySelector('#cek-add-desk');
    const signInDesk = document.querySelector('#sign-in-desk');
    const registerDesk = document.querySelector('#register-desk');
    const logoutDesk = document.querySelector('#logout');

    if (!Data.apiAuthenticatedUser) {
        checkPriceMob.style.display = 'none';
        addProductMob.style.display = 'none';
        logoutMob.style.display = 'none';
        checkAndAddDesk.style.display = 'none';
        logoutDesk.style.display = 'none';
    } else {
        signInDesk.style.display = 'none';
        signInMob.style.display = 'none';
        registerMob.style.display = 'none';
    }
}
