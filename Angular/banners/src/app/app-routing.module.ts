import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerDetailsComponent } from './banner-details/banner-details.component';
import { BannerListComponent } from './banner-list/banner-list.component';


const routes: Routes = [
  { path: 'banner-list', component: BannerListComponent },
  { path: 'banner-details/:id', component: BannerDetailsComponent },
  { path: '**', redirectTo: 'banner-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
