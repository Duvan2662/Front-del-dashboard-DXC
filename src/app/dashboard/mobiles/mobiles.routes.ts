import { Routes } from "@angular/router";
import { NewMobilePage } from "./pages/new-mobile-page/new-mobile-page";
import { Mobiles } from "./mobiles";
import { MobilePage } from "./pages/mobile-page/mobile-page";



export const routes: Routes = [
  {
    path: '',
    component: Mobiles,
  },
  {
    path: 'new-mobile',
    component: NewMobilePage
  },
  {
    path: 'edit/:id',
    component: NewMobilePage
  },
  {
    path: ':id',
    component: MobilePage
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }

];
