import { Routes } from '@angular/router';
import { Mobiles } from './mobiles/mobiles';
import { Home } from './home/home';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'mobile',
    component: Mobiles
  },


];
