import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// *Guards*
import { AuthGuard } from 'src/app/_common/guards/auth/auth.guard';
import { AuthCheckGuard } from 'src/app/_common/guards/auth-check/auth-check.guard';
import { LoginGuard } from 'src/app/_common/guards/login/login.guard';

// *Public Components*
import { ErrorComponent } from 'src/app/error/error.component';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { LogoutComponent } from 'src/app/logout/logout.component';
import { UserProfileContainerComponent } from 'src/app/user-profile/user-profile-container.component';
import { PortfolioComponent } from 'src/app/portfolio/portfolio.component';
import { GameProfileContainerComponent } from 'src/app/game-profile/game-profile-container.component';
import { GameJamComponent } from 'src/app/game-jam/game-jam.component';

// *Secure Components*

const appRoutes: Routes = [
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: '', canActivate: [AuthCheckGuard], children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'members', children: [
          { path: '', component: ErrorComponent, pathMatch: 'full' },
          { path: ':userId', component: UserProfileContainerComponent }
        ]
      },
      {
        path: 'portfolio', children: [
          { path: '', component: PortfolioComponent, pathMatch: 'full' },
          {
            path: 'games', children: [
              { path: '', component: ErrorComponent, pathMatch: 'full' },
              { path: ':gameId', component: GameProfileContainerComponent }
            ]
          }
        ]
      },
      { path: 'game-jam', component: GameJamComponent },
      { path: '**', component: ErrorComponent }
    ]
  }
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
