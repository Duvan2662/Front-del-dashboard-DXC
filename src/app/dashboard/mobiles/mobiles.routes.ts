import { Routes } from "@angular/router";
import { NewMobilePage } from "./pages/new-mobile-page/new-mobile-page";
import { Mobiles } from "./mobiles";
import { MobilePage } from "./pages/mobile-page/mobile-page";
import { ListPage } from "./pages/list-page/list-page";



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
    path: 'list',
    component:ListPage
  },
  {
    path: 'edit/:id',
    component: MobilePage
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }

];
