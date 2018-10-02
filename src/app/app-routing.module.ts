import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/common/guards/auth.guard';

import { HomeComponent } from 'src/app/home/home.component';
import { GamesComponent } from 'src/app/games/games.component';
import { EventsComponent } from 'src/app/events/events.component';

import { ManagementComponent } from 'src/app/management/management.component';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { GroupProfileComponent } from 'src/app/group-profile/group-profile.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'games', component: GamesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'users/:userId', component: UserProfileComponent },
  { path: 'groups/:groupId', component: GroupProfileComponent },
  { path: 'management', canActivate: [AuthGuard],
    children: [
      { path: '', component: ManagementComponent, pathMatch: 'full' }
    ]
  },
  { path: '**', component: ErrorComponent }
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
