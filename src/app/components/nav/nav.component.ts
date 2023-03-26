import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private rutas:Router) {}

  ngOnInit(): void {
  }

  goToSkills(){
    document.getElementById("skill-section")?.scrollIntoView({behavior:"smooth"});
  }
  goToEducation(){
    document.getElementById("education-section")?.scrollIntoView({behavior:"smooth"});
  }
  goToProjects(){
    document.getElementById("projects-section")?.scrollIntoView({behavior:"smooth"});
  }
  logout(){
    this.rutas.navigate(['/iniciar-sesion'])
    sessionStorage.removeItem("currentUser");
  }
}
