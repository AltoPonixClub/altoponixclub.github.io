import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogoComponent } from './icon/logo/logo.component';
import { SubteamsPageComponent } from './pages/subteams-page/subteams-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { PositionsPageComponent } from './pages/positions-page/positions-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { WebappPageComponent } from './pages/webapp-page/webapp-page.component';
import { AppCarouselComponent } from './components/app-carousel/app-carousel.component';
import { AppGraphComponent } from './components/app-graph/app-graph.component';
import { ChartModule } from 'angular-highcharts';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { SponsorPageComponent } from './pages/sponsor-page/sponsor-page.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HomePageComponent,
    LogoComponent,
    SubteamsPageComponent,
    AboutPageComponent,
    PositionsPageComponent,
    ContactPageComponent,
    PageNotFoundComponent,
    WebappPageComponent,
    AppCarouselComponent,
    AppGraphComponent,
    TeamPageComponent,
    SponsorPageComponent,
    AppFooterComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    ChartModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent, WebappPageComponent]
})
export class AppModule { }
