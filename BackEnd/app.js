'use strict'

// aqui guardamos toda la configuracion de Express y de las peticiones con body-parser

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos rutas
var project_routes = require('./routes/project');


//middlewares  es un metodo que se ejecuta antes de ejecutar la accion de un controlador

//convertir cualquier dato que llegue a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
app.use('/api', project_routes);


//exportar archivo app.js ya que es el que contiene toda la funcionalidad de express

module.exports = app;
