import * as Data from '../app/data.mjs'
import * as Logout from '../model/logout.mjs';

const route = (route) => {
    
    if(route === 'logout'){
        Logout.logout();
        const path = Data.routeView + 'login.html'
        window.location.href = path;

    }else{
        const path = Data.routeView + route + '.html'
        window.location.href = path;
    }

}
window.route = route;



