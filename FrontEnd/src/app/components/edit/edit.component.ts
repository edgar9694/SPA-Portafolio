import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public filesToUpload: Array<File>;
  public url;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
      this.title = "Editar Proyecto";
      this.url = Global.url;
   }

   ngOnInit() {
     this._route.params.subscribe(params =>{
       let id = params.id;

       this.getProject(id);
     });
   }

   getProject(id){
     this._projectService.getProject(id).subscribe(
       response => {
         this.project = response.project;
         console.log(this.project);
       },
       error => {
         console.log(<any>error);
       }
     )
   }

   onSubmit(){
     this._projectService.updateProject(this.project).subscribe(
       response => {

         if(response.project){

           if(this.filesToUpload){

             //Subir la imagen
             this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image').then((result:any)=>{
               this.status = 'success';

               this.save_project = result.project;
             });
           } else {
             this.status = 'success';

             this.save_project = response.project;
           }

         } else {
           this.status = 'failed';
         }

       },
       error => {
         console.log(<any>error);
       }
     )
   }

   fileChangeEvent(fileInput: any){
     //se fuerza a que la variable se una array de tipo file y se selecciona fileInput que es lo que captua el evento y buscamos la imagen
     this.filesToUpload = <Array<File>>fileInput.target.files
   }

}
