import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/_common/guards/auth.guard';
import { APP_PATH } from 'src/app/_common/constants/paths';

// *Public Components*
import { ErrorComponent } from 'src/app/error/error.component';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { LogoutComponent } from 'src/app/logout/logout.component';
import { UserProfileComponent } from 'src/app/user-profile/public/user-profile.component';
import { GroupProfileComponent } from 'src/app/group-profile/public/group-profile.component';
import { PortfolioComponent } from 'src/app/portfolio/portfolio.component';
import { GameProfileComponent } from 'src/app/game-profile/public/game-profile.component';
import { GameJamComponent } from 'src/app/game-jam/game-jam.component';

// *Secure Components*
import { UserProfileManagementComponent } from 'src/app/user-profile/secure/user-profile-management.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'members', children: [
      { path: '', component: ErrorComponent, pathMatch: 'full' },
      { path: ':userId', component: UserProfileComponent }
    ]
  },
  // {
  //   path: 'groups', children: [
  //     { path: '', component: ErrorComponent, pathMatch: 'full' },
  //     { path: ':groupId', component: GroupProfileComponent }
  //   ]
  // },
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
  { path: 'game-jam', component: GameJamComponent },
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
