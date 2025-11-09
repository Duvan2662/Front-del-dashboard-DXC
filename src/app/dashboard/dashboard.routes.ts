import { Routes } from '@angular/router';
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
    loadChildren: () => import('./mobiles/mobiles.routes').then(m => m.routes)
  },
  {
    path: 'users',
    component: Users
  }

];
