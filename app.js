
//CARGA DE DEPENDENCIAS
var express = require('express'); //EXPRESS
var app = express(); 



var bodyParser = require('body-parser'); //BODY-PARSER 

const cors = require('cors'); //CORS
const { urlencoded } = require('body-parser');

//IMPLEMENTACION DE DEPENDENCIAS
app.use(cors());
app.use(express.json());
app.use(urlencoded());
app.use(express.static('/public'));

//Configuracion de CORS
app.use((req, res, next) =>{
    res.header("access-controll-allow-origin", "*");

    res.header(
        "access-control-allow-headers",
        "authorization, X-API-KEY, origin, X-Requested-With, content-type, accept, Access-Control-Allow-Request-Method"
    );

    res.header(
        "Access-Control-Allow-Request-Method",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    res.header("Allow", "GET, POST, PUT, DELETE, OPTIONS");

    next();
});

//IMPORTACION DE RUTAS
app.use(require('./routers/routers'));
//
//

module.exports = app;





