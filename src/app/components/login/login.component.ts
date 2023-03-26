import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form:FormGroup;
    constructor(private formBuilder:FormBuilder, private autenticationService:AutenticationService, private rutas:Router) {
      this.form = this.formBuilder.group(
        {
          nombreUsuario:["",[Validators.required,Validators.minLength(2)]],
          password:["",[Validators.required,Validators.minLength(4)]]
        }
      )
     }
  
    ngOnInit(): void {
    }
  
    get NombreUsuario()
    {
      return this.form.get("nombreUsuario");
    }
  
    get Password()
    {
      return this.form.get("password");
    }
  
    onEnviar(event:Event)
    {
      event.preventDefault;
      this.autenticationService.IniciarSesion(this.form.value).subscribe(data=>{
        this.rutas.navigate(['/portfolio']);
      })
    }

}
