import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/_common/guards/auth.guard';

// *Public Components*
import { ErrorComponent } from 'src/app/error/error.component';
import { HomeComponent } from 'src/app/home/home.component';
import { EventsComponent } from 'src/app/events/events.component';
import { EventProfileComponent } from 'src/app/event-profile/event-profile.component';
import { UsersComponent } from 'src/app/users/users.component';
import { UserProfileComponent } from 'src/app/user-profile/public/user-profile.component';
import { GroupsComponent } from 'src/app/groups/groups.component';
import { GroupProfileComponent } from 'src/app/group-profile/group-profile.component';
import { PortfolioComponent } from 'src/app/portfolio/portfolio.component';
import { GameProfileComponent } from 'src/app/game-profile/game-profile.component';

// *Secure Components*
import { ClubManagementComponent } from 'src/app/club-management/club-management.component';
import { UserProfileManagementComponent } from 'src/app/user-profile/secure/user-profile-management.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: 'events', component: EventsComponent, children: [
  // { path: ':eventId', component: EventProfileComponent }
  // ]},
  {
    path: 'members', children: [
      { path: '', component: ErrorComponent, pathMatch: 'full' },
      { path: ':userId', component: UserProfileComponent }
    ]
  },
  {
    path: 'groups', children: [
      { path: '', component: ErrorComponent, pathMatch: 'full' },
      { path: ':groupId', component: GroupProfileComponent }
    ]
  },
  {
    path: 'portfolio', children: [
      { path: '', component: PortfolioComponent, pathMatch: 'full' },
      {
        path: 'games', children: [
          { path: '', component: ErrorComponent, pathMatch: 'full' },
          { path: ':gameId', component: GameProfileComponent }
        ]
      }
    ]
  },
  {
    path: 'manage', canActivate: [AuthGuard], children: [
      { path: '', component: ErrorComponent, pathMatch: 'full' },
      { path: 'me', component: UserProfileManagementComponent }
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
