import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// *Modules*
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

// *Common Components*
import { AppComponent } from 'src/app/app.component';
import { PageHeaderComponent } from 'src/app/common/components/page-header/page-header.component';
import { PageFooterComponent } from 'src/app/common/components/page-footer/page-footer.component';
import { PortfolioItemComponent } from 'src/app/common/components/portfolio-item/portfolio-item.component';
import { PortfolioItemModalComponent } from 'src/app/common/components/portfolio-item-modal/portfolio-item-modal.component';
import { OfficerProfileComponent } from 'src/app/common/components/officer-profile/officer-profile.component';
import { OfficerProfileModalComponent } from 'src/app/common/components/officer-profile-modal/officer-profile-modal.component';
import { CountdownTimerComponent } from 'src/app/common/components/countdown-timer/countdown-timer.component';

// *Public Page Components*
import { GamesComponent } from 'src/app/public/games/games.component';
import { HomeComponent } from 'src/app/public/home/home.component';
import { EventsComponent } from 'src/app/public/events/events.component';

// *Secure Page Components*
import { ProfileComponent } from 'src/app/secure/profile/profile.component';
import { ManagementComponent } from 'src/app/secure/management/management.component';

// *Directives*
import {
  ScrollOnClickDirective
} from 'src/app/common/directives';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    ScrollOnClickDirective,
    PortfolioItemComponent,
    PortfolioItemModalComponent,
    OfficerProfileComponent,
    OfficerProfileModalComponent,
    CountdownTimerComponent,
    GamesComponent,
    HomeComponent,
    EventsComponent,
    ProfileComponent,
    ManagementComponent
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
