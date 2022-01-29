import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TeamPageComponent} from './pages/team-page/team-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PositionsPageComponent } from './pages/positions-page/positions-page.component';
import { SubteamsPageComponent } from './pages/subteams-page/subteams-page.component';
import { WebappPageComponent } from './pages/webapp-page/webapp-page.component';
import { SponsorPageComponent } from './pages/sponsor-page/sponsor-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  // { path: 'subteams', component: SubteamsPageComponent },
  { path: 'about', component: HomePageComponent },
  { path: 'positions', component: PositionsPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'sponsor', component: SponsorPageComponent },
  { path: 'team', component: TeamPageComponent},
  { path: 's2-webapp', component: WebappPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent},
  { path: 'feed', redirectTo: '/s2-webapp', pathMatch: 'full' },
  { path: 'data', redirectTo: '/s2-webapp', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
