import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura: number;
  // si quiero recibir una variable y cambiarle el nombre hago de esta manera
  @Input('etiquetas') captions: boolean;
  @Output() getAuthor = new EventEmitter();

  public author: any;

  constructor() {
    this.author ={
      nombre: "Edgar Ugueto",
      email: "edgard9u6@gmail.com",
      web: "github.com"
    }
   }

  ngOnInit() {

        $("#logo").click(function(e){
          e.preventDefault();
          $("header").css("background","green")
                     .css("height","50px");
        });

        $(".galeria").bxSlider({
          mode: 'fade',
          captions: this.captions,
          slideWidth: this.anchura
        })

  }

  launchEvent(event){
    // console.log(event);
    this.getAuthor.emit(this.author);
  }

}
