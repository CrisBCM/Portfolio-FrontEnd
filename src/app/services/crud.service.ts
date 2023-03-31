import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../classes/experiencia';
import { ExperienceSectionComponent } from '../components/experience-section/experience-section.component';
import { AutenticationService } from './autentication.service';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  api:string = "https://portfolio-api-3mv6.onrender.com";

  constructor(private autenticacionServicio:AutenticationService, private readonly http:HttpClient) { }
  ngOnInit(){

    
  }

  deleteService(id: number, path:string): Observable<{}> {
    console.log(this.api+"/eliminar/experiencia/"+id);
    return this.http.delete(`${this.api}${path}${id}`, {responseType:"text"});
  }
  
  createService(body:any, path:string):Observable<any>{

    let currentUser = this.autenticacionServicio.UsuarioAutenticado

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      }),
      responseType: 'text' as 'json'
    };

    return this.http.post<any>(`${this.api}${path}`, JSON.stringify(body), httpOptions);
  }

  updateService(id:number,path:string, body:any):Observable<{}>{
    let bodyKeys = Object.keys(body);

    let params = new HttpParams();
    // .set('nombre', "soy nombre")
    // .set('descripcion', "soy descripcion")
    // .set('listaDeLenguajes', "SOY el primer lenguaje")
    // .set('img', "soy la url de img")
    // .set('listaDeLenguajes', "SOY el segundo lenguaje");
    

    for(let k of bodyKeys){

      if(Array.isArray(body[k])){
        let array = body[k];

        array.forEach((a:any) => {
          params = params.append('lenguajesAprendidos', a);
          console.log("VALORES DEL ARRAY: " + a + k);
        });
      }else{
        params = params.set(k, body[k]);
      }

      

    }

      console.log(params)
      return this.http.put(`${this.api}${path}${id}`,params, {responseType:"text"})
    }
}
