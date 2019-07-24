import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService,UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
      this.title = "Crear Proyecto";
      this.project = new Project("","","","",2019,"","");
   }

  ngOnInit() {
  }

  onSubmit(form){
    //Guardar datos basico
    this._projectService.saveProject(this.project).subscribe(
      response => {
        console.log(response)
        if(response.project){

          if(this.filesToUpload){
            //Subir la imagen
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image').then((result:any)=>{
              this.status = 'success';

              this.save_project = result.project;
              // console.log(this.save_project);

              form.reset();
            });
          } else {
            this.status = 'success';

            this.save_project = response.project;
            // console.log(this.save_project);

            form.reset();
          }


        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    //se fuerza a que la variable se una array de tipo file y se selecciona fileInput que es lo que captua el evento y buscamos la imagen
    this.filesToUpload = <Array<File>>fileInput.target.files
  }

}
