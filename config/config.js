/**PUERTO
 * 
 */

process.env.PORT = process.env.PORT || 3000;

/*
BASE DE DATOS
*/

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffe';

} else {
    urlDB = 'mongodb+srv://Jean24Pierre:12345@amadeus.9ypjh.mongodb.net/coffe'
}

process.env.URLDB = urlDB;