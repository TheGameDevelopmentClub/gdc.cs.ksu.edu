import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { PageHeaderComponent } from './common/components/page-header/page-header.component';
import { PageFooterComponent } from './common/components/page-footer/page-footer.component';
import { PortfolioModalComponent } from './common/components/portfolio-modal/portfolio-modal.component';
import { EventAlertComponent } from './common/components/event-alert/event-alert.component';
import { ScrollOnClickDirective } from './common/directives/scroll-on-click/scroll-on-click.directive';
import { PortfolioItemComponent } from './common/components/portfolio-item/portfolio-item.component';
import { OfficerProfileComponent } from './common/components/officer-profile/officer-profile.component';
import { OfficerProfileModalComponent } from './common/components/officer-profile-modal/officer-profile-modal.component';
import { CountdownTimerComponent } from './common/components/countdown-timer/countdown-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PortfolioModalComponent,
    EventAlertComponent,
    ScrollOnClickDirective,
    PortfolioItemComponent,
    OfficerProfileComponent,
    OfficerProfileModalComponent,
    CountdownTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
