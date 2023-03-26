import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  deleteExperience(id: number): Observable<{}> {
    console.log(this.api+"/eliminar/experiencia/"+id);
    return this.http.delete(`${this.api}/eliminar/experiencia/${id}`, {responseType:"text"});
  }
  
  createExperience(exp:Experiencia):Observable<any>{

    let currentUser = this.autenticacionServicio.UsuarioAutenticado

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      }),
      responseType: 'text' as 'json'
    };

    console.log(JSON.stringify(exp));
    console.log(httpOptions);

    return this.http.post<any>(this.api + "/crear/experiencia", JSON.stringify(exp), httpOptions);
  }

  updateExperience(id:number, exp:Experiencia):Observable<{}>{

    const params = new HttpParams()
      .set('puesto',exp.puesto)
      .set('compania',exp.compania)
      .set('fechaInicio',exp.fechaInicio)
      .set('fechaFinal',exp.fechaFinal);

      return this.http.put(`${this.api}/editar/experiencia/${id}`,params, {responseType:"text"})
    }
}
