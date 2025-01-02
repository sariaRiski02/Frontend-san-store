import * as Data from '../app/data.mjs'

const route = (route) => {
    window.location.href = Data.routeView + route + '.html';
}
window.route = route;