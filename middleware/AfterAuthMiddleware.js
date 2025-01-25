import * as Data from '../app/data.mjs'
function afterAuth(){
    
    const token = localStorage.getItem('pat');
    
    let access = false;
    Data.check(JSON.stringify({'token': token}))
        .then(response => {
            access = response ? true : false;
            if(token && access){
                window.location.href = Data.routeViewSale;
            }
        }).catch(error => {
            access = false;
        });
}

afterAuth();