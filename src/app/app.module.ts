import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    WebappPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
