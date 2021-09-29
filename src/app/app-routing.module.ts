import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PositionsPageComponent } from './pages/positions-page/positions-page.component';
import { SubteamsPageComponent } from './pages/subteams-page/subteams-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'subteams', component: SubteamsPageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'positions', component: PositionsPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
