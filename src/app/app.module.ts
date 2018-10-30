import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// *Modules*
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// *Directives*
import { ScrollOnClickDirective } from 'src/app/_common/directives/scroll-on-click/scroll-on-click.directive';
import { ImageLoaderDirective } from 'src/app/_common/directives/image-loader/image-loader.directive';

// *Pipes*
import { SanitizeInputPipe } from 'src/app/_common/pipes/sanitize-input/sanitize-input.pipe';

// *Public Page Components*
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from 'src/app/home/home.component';
import { EventsComponent } from 'src/app/events/events.component';
import { EventProfileComponent } from './event-profile/event-profile.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from 'src/app/user-profile/public/user-profile.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupProfileComponent } from './group-profile/group-profile.component';
import { GameProfileComponent } from './game-profile/game-profile.component';

// *Secure Page Components*
import { ClubManagementComponent } from 'src/app/club-management/club-management.component';
import { UserProfileManagementComponent } from 'src/app/user-profile/secure/user-profile-management.component';

// *Common Components*
import { AppComponent } from 'src/app/app.component';
import { LoadingOverlayComponent } from 'src/app/_common/components/loading-overlay/loading-overlay.component';
import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { PageHeaderComponent } from 'src/app/_common/components/page-header/page-header.component';
import { PageFooterComponent } from 'src/app/_common/components/page-footer/page-footer.component';
import { PortfolioItemComponent } from 'src/app/_common/components/portfolio-item/portfolio-item.component';
import { OfficerProfileComponent } from 'src/app/_common/components/officer-profile/officer-profile.component';
import { CountdownTimerComponent } from 'src/app/_common/components/countdown-timer/countdown-timer.component';
import { FileUploadComponent } from 'src/app/_common/components/file-upload/file-upload.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PaginationComponent } from './_common/components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollOnClickDirective,
    ImageLoaderDirective,
    SanitizeInputPipe,
    PageHeaderComponent,
    PageFooterComponent,
    PortfolioItemComponent,
    OfficerProfileComponent,
    CountdownTimerComponent,
    HomeComponent,
    EventsComponent,
    UserProfileComponent,
    ClubManagementComponent,
    LoadingOverlayComponent,
    FileUploadComponent,
    InfoMessagesComponent,
    GroupProfileComponent,
    ErrorComponent,
    UserProfileManagementComponent,
    GameProfileComponent,
    EventProfileComponent,
    UsersComponent,
    GroupsComponent,
    PortfolioComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
