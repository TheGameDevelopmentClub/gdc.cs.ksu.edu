import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { PageHeaderComponent } from './common/components/page-header/page-header.component';
import { PageFooterComponent } from './common/components/page-footer/page-footer.component';
import { PortfolioModalComponent } from './common/components/portfolio-modal/portfolio-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PortfolioModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
