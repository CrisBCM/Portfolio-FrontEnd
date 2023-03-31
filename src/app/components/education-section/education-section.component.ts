import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticationService } from 'src/app/services/autentication.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Curso } from 'src/app/classes/curso';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.css']
})
export class EducationSectionComponent implements OnInit {

  selection:number = 0;
  miCurso = new Curso("","",[],"");
  contador:number = 0;

  formSwitchCrear:boolean = false;
  formSwitchUpdate:boolean = false;
  form!:FormGroup;
  idCurso:number = 0;
  arrayLenguajes:string[] = [];
  arrayRandom:string[] = [];
  values:string[] = [];

  constructor(private autenticacionServicio:AutenticationService,private datosPortfolio:PortfolioService, private formBuilder:FormBuilder, private crudService:CrudService) {
    this.form = formBuilder.group(
      {
        nombre:["",[Validators.required,Validators.minLength(2)]],
        descripcion:["",[Validators.required,Validators.minLength(2)]],
        img:["",[Validators.required,Validators.minLength(2)]],
        lenguajesAprendidos:new FormArray([
          this.formBuilder.control('')
        ])
      });
  }

    
  

  arrayCursos:any;

  ngOnInit(): void {
    this.datosPortfolio.obtenerCursos().subscribe(data =>{

      this.arrayCursos = data;
      
      for(let key of this.arrayCursos){
        console.log(Object.keys(key));
      }
    })
  }

  onClick(object:any){
    this.selection = object.id;
    this.miCurso.nombre = object.nombre;
    this.miCurso.descripcion = object.descripcion;
    
    this.idCurso = object.id;
  }

  abrirFormCrear(){
    this.formSwitchCrear = true;
    this.formSwitchUpdate = false;
  }
  cerrarFormCrear(){
    this.formSwitchCrear = false;
    var resetForm:HTMLFormElement;
  resetForm = <HTMLFormElement>document.getElementById('myForm');
    resetForm.reset();
    this.contador = 0;
  }
  abrirFormUpdate(){
    this.formSwitchUpdate = true;
    this.formSwitchCrear =false;
  }
  cerrarFormUpdate(){
    this.formSwitchUpdate = false;
    var resetForm:HTMLFormElement;
  resetForm = <HTMLFormElement>document.getElementById('myForm');
  console.log(this.form);
    resetForm.reset();
    this.contador = 0;
  }
  obtenerCurrentUserLength(){
    var currentUser = this.autenticacionServicio.UsuarioAutenticado;
    return currentUser.authorities.length;
  }

  construirCurso(){

    let curso = new Curso("this.form.value.nombre", "this.form.value.descripcion", ["this.arrayRandom"], "this.form.value.img");

    return curso;
  }

  enviarCurso(body:any){
    let path = "/crear/curso";
    this.crudService.createService(body, path).subscribe(()=>{
      this.ngOnInit();
    })
  }
  crearCurso(event:Event){
    event.preventDefault;

    let curso = this.construirCurso();

    this.enviarCurso(curso);

    this.cerrarFormCrear();
  }

  anadirLenguaje(event:Event){
    event.preventDefault;
    this.contador++

    this.lenguajesAprendidos.push(this.formBuilder.control(''));
  }
  
  actualizarCurso(id:number, body:any){

    let path = "/editar/curso/";
    
    this.crudService.updateService(id, path, body).subscribe(()=>{
      this.ngOnInit();
    })
  }

  updateCurso(event:Event){
    event.preventDefault;

    let curso = this.construirCurso();

    console.log(curso);
    this.actualizarCurso(this.idCurso, curso);
    // this.cerrarFormUpdate();
  }
  eliminarCurso(id:number){
    let path = "/eliminar/curso/";
    this.crudService.deleteService(id, path).subscribe(()=>{
      this.ngOnInit();
    })
  }

}
