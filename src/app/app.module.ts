import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// *Modules*
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

// *Components*
import { AppComponent } from 'src/app/app.component';
import {
  PageHeaderComponent,
  PageFooterComponent,
  EventAlertComponent,
  PortfolioItemComponent,
  OfficerProfileComponent,
  OfficerProfileModalComponent,
  CountdownTimerComponent
} from 'src/app/common/components';

// *Directives*
import {
  ScrollOnClickDirective
} from 'src/app/common/directives';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    EventAlertComponent,
    ScrollOnClickDirective,
    PortfolioItemComponent,
    OfficerProfileComponent,
    OfficerProfileModalComponent,
    CountdownTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [
    OfficerProfileModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
