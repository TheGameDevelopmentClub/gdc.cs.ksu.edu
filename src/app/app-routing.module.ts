import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: '**', redirectTo: '/' }
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
