'use strict'

var Project = require('../models/project');
var fs = require('fs');
//modulo de nodeJs para cargar rutas fisicas de nuestro sistema de archivos
var path = require('path');

var controller = {

  home: function(req, res){
    return res.status(200).send({
      message: 'Soy Home'
    });
  },

  test: function(req, res){
    return res.status(200).send({
      message: 'Soy el metodo Test del controlador de project'
    });
  },

  //metodo que permita guardar en base de datos
  saveProject: function(req, res){
    //creando un objeto del proyecto
    var project = new Project();

    var params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;

    project.save((err, projectStored) =>{
      if(err) return res.status(500).send({message: 'Error al guardar'}) ;

      if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

      return res.status(200).send({project:projectStored});
    });

  },

  //metodo que permita obtener un elemento de la base de datos
  getProject: function(req, res){
    var projectId = req.params.id;

    if (projectId == null) return res.status(404).send({message: 'El proyecto no existe'});

    Project.findById(projectId, (err ,project) => {

      if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

      if(!project) return res.status(404).send({message: 'El proyecto no existe'});

      return res.status(200).send({
        project
      });
    });
  },

  //metodo que permita obtener todos los elementos de la base de datos
  getAllProjects: function(req, res){
    Project.find().sort('-year').exec((err, projects)=>{
      if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

      if(!projects) return res.status(404).send({message: 'no hay proyectos para mostrar'});

      return res.status(200).send({
        projects
      });
    })
  },

  //metodo que permita actualizar un elemento de la base de datos
  updateProject: function(req, res){
    var projectId = req.params.id;
    var update = req.body;

    Project.findByIdAndUpdate(projectId, update, {new:true}, (err ,projectUpdated) => {

      if(err) return res.status(500).send({message: 'Error al actualizar.'});

      if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe'});

      return res.status(200).send({
        project: projectUpdated
      });
    });

  },


  //metodo que permita actualizar un elemento de la base de datos
  deleteProject: function(req, res){
      var projectId = req.params.id;

      Project.findByIdAndDelete(projectId, (err ,projectDeleted) => {

        if(err) return res.status(500).send({message: 'Error al actualizar.'});

        if(!projectDeleted) return res.status(404).send({message: 'El proyecto no existe'});

        return res.status(200).send({
          project: projectDeleted
        });
      });

    },


    //metodo que permita subir una imagen a un elemento de la base de datos
    uploadImage: function(req, res){
      var projectId = req.params.id;
      var fileName = 'Imagen no subida ...';

      if (req.files) {
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[1];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif')
        {

          Project.findByIdAndUpdate(projectId,{image:fileName},{new:true},(err, projectUpdated) => {

            if(err) return res.status(500).send({message: 'Error al actualizar la imagen.'});

            if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe'});

            return res.status(200).send({
              project: projectUpdated
            });

          });

        } else {
          fs.unlink(filePath, (err) => {

            return res.status(200).send({message: "la extension no es valida"})

          });

        }



      } else {
        return res.status(200).send({
          message: fileName
        });
      }
    },

    getImageFile: function(req, res){
      var file = req.params.image;
      var path_file = './uploads/'+file;

      fs.exists(path_file, (exists)=>{

        if (exists) {
          return res.sendFile(path.resolve(path_file));
        } else {
          return res.status(200).send({
            message: 'No existe la imagen'
          })
        }

      })

    }




};

//se exporta el controlador para convertirse en un objeto JSON
module.exports = controller;
