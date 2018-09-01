import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './common/guards/auth.guard';

// *Public Routes*
import { HomeComponent } from 'src/app/public/home/home.component';
import { GamesComponent } from 'src/app/public/games/games.component';
import { EventsComponent } from 'src/app/public/events/events.component';

// *Secure Routes*
import { ProfileComponent } from 'src/app/secure/profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'games', component: GamesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
