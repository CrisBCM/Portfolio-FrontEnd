import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { PortfolioWebComponent } from './components/portfolio-web/portfolio-web.component';

const routes:Routes = [
  {path:"portfolio", component:PortfolioWebComponent},
  {path:"iniciar-sesion", component:LoginComponent},
  {path:"", redirectTo:"iniciar-sesion", pathMatch:"full"}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],
    exports:[RouterModule]
})
export class AppRoutingModule { }


// , canActivate:[GuardGuard]