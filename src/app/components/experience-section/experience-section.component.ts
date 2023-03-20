import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})
export class ExperienceSectionComponent implements OnInit {

  constructor(private datosPortfolio:PortfolioService) {}

  listExperiencia:any;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosExperiencia().subscribe(data =>{
      console.log("Array de experiencia: " + JSON.stringify(data));

      this.listExperiencia = data;
    })
  }

}
