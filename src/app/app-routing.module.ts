import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/common/guards/auth.guard';

// *Public Components*
import { HomeComponent } from 'src/app/public/home/home.component';
import { GamesComponent } from 'src/app/public/games/games.component';
import { EventsComponent } from 'src/app/public/events/events.component';

// *Secure Components*
import { ProfileComponent } from 'src/app/secure/profile/profile.component';
import { ManagementComponent } from 'src/app/secure/management/management.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'games', component: GamesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'management', canActivate: [AuthGuard],
    children: [
      { path: '', component: ManagementComponent, pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent }
    ]
  },
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
