import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  constructor(private datosPortfolio:PortfolioService) {
  }
  miPortfolio:any;
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosPersona().subscribe(data =>{
      console.log("Datos Personales " + JSON.stringify(data));

      this.miPortfolio = data[0];
    });
  }
}
