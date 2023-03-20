import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css']
})
export class ProjectsSectionComponent implements OnInit {

  constructor(private datosPortfolio:PortfolioService) { }

  arrayProjectos:any;

  ngOnInit(): void {
    this.datosPortfolio.obtenerProjectos().subscribe(data=>{
      
      console.log(data);

      this.arrayProjectos = data;
    })
  }

}
