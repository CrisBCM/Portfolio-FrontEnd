import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.css']
})
export class SkillsSectionComponent implements OnInit {

  porcentaje60:string = "60";
  porcentaje40:string = "40";
  porcentaje80:string = "80";

  constructor(private datosPortfolio:PortfolioService) {
   }
  lenguajes:any;

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatosLenguaje().subscribe(data =>{
      console.log("Array de Lenguajes" + JSON.stringify(data));

      this.lenguajes = data;

    })
  }

}
