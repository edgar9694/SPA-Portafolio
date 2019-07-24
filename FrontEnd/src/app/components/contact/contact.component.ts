import { Component, OnInit, ViewChild, AfterViewInit, ElementRef} from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit{

  public widthSlider: number;
  public anchuraToSlider: number;
  public captions: boolean;
  public author: any;
  @ViewChild('textos', {static: false}) Textos: ElementRef;

  constructor() {
    this.captions = false;
  }

  ngOnInit() {
    var opcion_clasica = document.querySelector('#texto').innerHTML;
  }

  ngAfterViewInit(){
    // console.log(this.Textos.nativeElement.textContent);
  }

  cargarSlider(){

    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider(){
    this.anchuraToSlider = null;
  }

  getAuthor(event){
    // console.log(event)
    this.author = event;
  }

}
