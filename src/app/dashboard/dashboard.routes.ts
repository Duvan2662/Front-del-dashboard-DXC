import { Routes } from '@angular/router';
import { Mobiles } from './mobiles/mobiles';
import { Home } from './home/home';
import { Users } from './users/users';


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
    path: 'mobiles',
    component: Mobiles
  },
  {
    path: 'users',
    component: Users
  }


];
