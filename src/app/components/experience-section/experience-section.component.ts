import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/classes/experiencia';
import { AutenticationService } from 'src/app/services/autentication.service';
import { CrudService } from 'src/app/services/crud.service';
import { InterceptorService } from 'src/app/services/interceptor.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})
export class ExperienceSectionComponent implements OnInit {
  formSwitchCrear:boolean = false;

  formSwitchUpdate:boolean = false;

  miExperiencia:Experiencia = new Experiencia("","","","");
  idExp!:number;

  form:FormGroup;

  selection:number = 0;

  pathEliminar:string ="/eliminar/experiencia/";
  pathCrear:string = "/crear/experiencia"
  pathUpdate:string ="/editar/experiencia/"

  constructor(private datosPortfolio:PortfolioService, private crudService: CrudService, private formBuilder:FormBuilder, private autenticacionServicio: AutenticationService) {
    this.form = this.formBuilder.group(
      {
        puesto:["",[Validators.required,Validators.minLength(2)]],
        compania:["",[Validators.required,Validators.minLength(2)]],
        fechaInicial:["",[Validators.required,Validators.minLength(2)]],
        fechaFinal:["",[Validators.required,Validators.minLength(2)]]
      }
    )
  }

  obtenerCurrentUserLength(){
    var currentUser = this.autenticacionServicio.UsuarioAutenticado;
    return currentUser.authorities.length;
  }

  eliminarExperiencia(id:number){
    if(confirm('Are you sure?')){
      this.crudService.deleteService(id, this.pathEliminar).subscribe(()=>{
        this.listExperiencia = this.listExperiencia.filter((experiencia:any) => experiencia.id !== id);
      });      
    }
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

  onClick(object:any){
    this.selection = object.id;
    this.miExperiencia.puesto = object.puesto;
    this.miExperiencia.compania = object.compania;
    this.miExperiencia.fechaInicio = object.fechaInicio;
    this.miExperiencia.fechaFinal = object.fechaFinal;
    this.idExp = object.id;

    console.log(this.idExp);
  }

  enviarExperiencia(body:any){
    this.crudService.createService(body, this.pathCrear).subscribe(textData =>{
      this.ngOnInit();
      console.log(textData);
    })
  }
  actualizarExperiencia(id:number, body:any){
    this.crudService.updateService(id,this.pathUpdate, body).subscribe(() =>{
      this.ngOnInit();
    })
  }

  listExperiencia:any;

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatosExperiencia().subscribe(data =>{
      this.listExperiencia = data;
    })
  }

  get Puesto(){
    return this.form.get("puesto");
  }
  get Compania(){
    return this.form.get("compania");
  }
  get FechaInicio(){
    return this.form.get("fechaInicial");
  }
  get FechaFinal(){
    return this.form.get("fechaFinal");
  }

  crearExperiencia(event:Event){
    event.preventDefault;
    let exp = new Experiencia(this.form.value.puesto, this.form.value.compania, this.form.value.fechaInicial,this.form.value.fechaFinal)
    this.enviarExperiencia(exp);
    this.cerrarFormCrear();
  }
  updateExperiencia(event:Event){
    event.preventDefault;
    let exp = new Experiencia(this.form.value.puesto, this.form.value.compania, this.form.value.fechaInicial,this.form.value.fechaFinal)
    
    this.actualizarExperiencia(this.idExp,exp);

    this.formSwitchUpdate = false;
  }
}
