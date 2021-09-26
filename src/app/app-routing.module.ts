import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ListingPageComponent } from './components/listing-page/listing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, children: [
    { path: '', component: ListingPageComponent  },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
