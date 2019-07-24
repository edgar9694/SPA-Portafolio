'use strict'


var mongoose = require('mongoose');
//se carga el esquema del modelo
var Schema = mongoose.Schema;

//molde de creacion de nuevos elementos para la DB
var ProjectSchema = Schema({
  name: String,
  description: String,
  category: String,
  year:Number,
  langs: String,
  image: String
})


//exportamos el esquema para utilizarlo como modelo
module.exports = mongoose.model('Project',ProjectSchema);
//mongoose cuando se le pone una coleccion en mayuscula lo que hace es colocarlo en minuscula la pluraliza(Ej: Project -> projects )y crea la coleccion, si la coleccion ya existe lo que hace es guardarla
