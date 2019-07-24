'use strict'

//importamos el modulo de mongoose
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

//realizamos la conexion a la base de datos
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio', { useNewUrlParser: true })
          .then((res) => {
              console.log("Conexion a la base de datos con exito");

              //creacion del servidor
              app.listen(port, () => {
                console.log("Servidor corriendo correctamente en la url: localhost:3700");
              });

          })
          .catch(err => console.log(err));
