import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from 'src/app/classes/skill';
import { AutenticationService } from 'src/app/services/autentication.service';
import { CrudService } from 'src/app/services/crud.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.css']
})
export class SkillsSectionComponent implements OnInit {
  form:FormGroup;

  miSkill = new Skill("", "");
  idSkill!:number;
  selection:number = 0;

  pathCrear:string = "/crear/lenguaje";
  pathUpdate:string ="/editar/lenguaje/";
  pathEliminar:string = "/eliminar/lenguaje/"

  formSwitchCrear:boolean = false;

  formSwitchUpdate:boolean = false;

  porcentaje60:string = "60";

  porcentaje40:string = "40";

  porcentaje80:string = "80";

  lenguajes:any;

  constructor(private datosPortfolio:PortfolioService, private crudService:CrudService, private formBuilder:FormBuilder, private autenticacionServicio:AutenticationService) {
    this.form = this.formBuilder.group(
      {
        nombre:["",[Validators.required,Validators.minLength(2)]],
        conocimientoPorcentaje:["",[Validators.required,Validators.minLength(2)]]
      }
    )
  }
  onClick(object:any){
    this.selection = object.id;
    this.miSkill.nombre = object.nombre;
    this.miSkill.conocimientoPorcentaje = object.conocimientoPorcentaje;
    
    this.idSkill = object.id;
  }
  abrirFormCrear(){
    this.formSwitchCrear = true;
    this.formSwitchUpdate = false;
  }
  cerrarFormCrear(){
    this.formSwitchCrear = false;
    var resetForm:HTMLFormElement;
  resetForm= <HTMLFormElement>document.getElementById('myForm');
  if(resetForm)
    resetForm.reset();
  }
  abrirFormUpdate(){
    this.formSwitchUpdate = true;
    this.formSwitchCrear =false;
  }
  cerrarFormUpdate(){
    this.formSwitchUpdate = false;
    var resetForm:HTMLFormElement;
  resetForm= <HTMLFormElement>document.getElementById('myForm');
  if(resetForm)
    resetForm.reset();
  }
  
  obtenerCurrentUserLength(){
    var currentUser = this.autenticacionServicio.UsuarioAutenticado;
    return currentUser.authorities.length;
  }

  enviarSkill(body:any){
    this.crudService.createService(body,this.pathCrear).subscribe(()=>{
      this.ngOnInit();
    })
  }
  construirSkill(){
    let skill = new Skill(this.form.value.nombre, this.form.value.conocimientoPorcentaje);
    return skill;
  }

  crearSkill(event:Event){
    event.preventDefault;

    let skill = this.construirSkill()

    this.enviarSkill(skill);
    this.cerrarFormCrear();
  }
  updateSkill(event:Event){
    event.preventDefault;

    let skill = this.construirSkill;
    
    this.actualizarSkill(this.idSkill, skill);
  }

  actualizarSkill(id:number, body:any){
    this.crudService.updateService(id, this.pathUpdate, body).subscribe(()=>{
      this.ngOnInit();
    })
  }
  eliminarSkill(id:number){
    if(confirm("Are you sure?")){
      this.crudService.deleteService(id, this.pathEliminar).subscribe(()=>{
        this.ngOnInit();
      })
    }
  }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatosLenguaje().subscribe(data =>{
      console.log("Array de Lenguajes" + JSON.stringify(data));

      this.lenguajes = data;

    })
  }

}
