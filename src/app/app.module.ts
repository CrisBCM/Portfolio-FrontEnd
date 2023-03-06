import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { LoginComponent } from './components/login/login.component';
import { PortfolioWebComponent } from './components/portfolio-web/portfolio-web.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    AboutMeComponent,
    SkillsSectionComponent,
    ExperienceSectionComponent,
    LoginComponent,
    PortfolioWebComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
