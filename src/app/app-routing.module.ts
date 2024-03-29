import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { PortfolioWebComponent } from './components/portfolio-web/portfolio-web.component';
import { GuardGuard } from './services/guard.guard';

const routes:Routes = [
  {path:"portfolio", component:PortfolioWebComponent, canActivate:[GuardGuard]},
  {path:"iniciar-sesion", component:LoginComponent},
  {path:"", redirectTo:"iniciar-sesion", pathMatch:"full"}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation:"ignore",
    anchorScrolling:"enabled",
    scrollPositionRestoration:"enabled"
  }),
    HttpClientModule],
    exports:[RouterModule]
})
export class AppRoutingModule { }
