import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// *Modules*
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// *Directives*
import { ScrollOnClickDirective } from 'src/app/_common/directives/scroll-on-click/scroll-on-click.directive';
import { ImageLoaderDirective } from 'src/app/_common/directives/image-loader/image-loader.directive';

// *Pipes*
import { SanitizeInputPipe } from 'src/app/_common/pipes/sanitize-input/sanitize-input.pipe';

// *Public Page Components*
import { ErrorComponent } from 'src/app/error/error.component';
import { HomeComponent } from 'src/app/home/home.component';
import { UserProfileComponent } from 'src/app/user-profile/public/user-profile.component';
import { GroupProfileComponent } from 'src/app/group-profile/public/group-profile.component';
import { GameProfileComponent } from 'src/app/game-profile/public/game-profile.component';
import { GameJamComponent } from 'src/app/game-jam/game-jam.component';

// *Secure Page Components*
import { UserProfileManagementComponent } from 'src/app/user-profile/secure/user-profile-management.component';
import { CreateGroupComponent } from 'src/app/create-group/create-group.component';
import { GroupProfileManagementComponent } from 'src/app/group-profile/secure/group-profile-management.component';
import { GameProfileManagementComponent } from 'src/app/game-profile/secure/game-profile-management.component';

// *Common Components*
import { AppComponent } from 'src/app/app.component';
import { LoadingOverlayComponent } from 'src/app/_common/components/loading-overlay/loading-overlay.component';
import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { PageHeaderComponent } from 'src/app/_common/components/page-header/page-header.component';
import { PageFooterComponent } from 'src/app/_common/components/page-footer/page-footer.component';
import { PortfolioItemComponent } from 'src/app/_common/components/portfolio-item/portfolio-item.component';
import { CountdownTimerComponent } from 'src/app/_common/components/countdown-timer/countdown-timer.component';
import { FileUploadComponent } from 'src/app/_common/components/file-upload/file-upload.component';
import { PortfolioComponent } from 'src/app/portfolio/portfolio.component';
import { PaginationBarComponent } from 'src/app/_common/components/pagination-bar/pagination-bar.component';
import { OfficerBadgeComponent } from 'src/app/_common/components/officer-badge/officer-badge.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollOnClickDirective,
    ImageLoaderDirective,
    SanitizeInputPipe,
    PageHeaderComponent,
    PageFooterComponent,
    PortfolioItemComponent,
    CountdownTimerComponent,
    HomeComponent,
    UserProfileComponent,
    LoadingOverlayComponent,
    FileUploadComponent,
    InfoMessagesComponent,
    GroupProfileComponent,
    ErrorComponent,
    UserProfileManagementComponent,
    GameProfileComponent,
    PortfolioComponent,
    PaginationBarComponent,
    OfficerBadgeComponent,
    GameProfileManagementComponent,
    CreateGroupComponent,
    GroupProfileManagementComponent,
    GameJamComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [
    CreateGroupComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
