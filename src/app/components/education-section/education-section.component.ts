import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.css']
})
export class EducationSectionComponent implements OnInit {

  constructor(private datosPortfolio:PortfolioService) { }

  arrayCursos:any;

  ngOnInit(): void {
    this.datosPortfolio.obtenerCursos().subscribe(data =>{

      this.arrayCursos = data;
      
      console.log(this.arrayCursos);
    })
  }

}
