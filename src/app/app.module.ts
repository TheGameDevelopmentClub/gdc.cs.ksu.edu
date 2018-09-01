import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// *Modules*
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

// *Components*
import { AppComponent } from 'src/app/app.component';
import {
  PageHeaderComponent,
  PageFooterComponent,
  EventAlertComponent,
  PortfolioItemComponent,
  PortfolioItemModalComponent,
  OfficerProfileComponent,
  OfficerProfileModalComponent,
  CountdownTimerComponent
} from 'src/app/common/components';

// *Directives*
import {
  ScrollOnClickDirective
} from 'src/app/common/directives';
import { GamesComponent } from 'src/app/public/games/games.component';
import { HomeComponent } from 'src/app/public/home/home.component';
import { EventsComponent } from 'src/app/public/events/events.component';
import { ProfileComponent } from 'src/app/secure/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    EventAlertComponent,
    ScrollOnClickDirective,
    PortfolioItemComponent,
    PortfolioItemModalComponent,
    OfficerProfileComponent,
    OfficerProfileModalComponent,
    CountdownTimerComponent,
    GamesComponent,
    HomeComponent,
    EventsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [
    PortfolioItemModalComponent,
    OfficerProfileModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
