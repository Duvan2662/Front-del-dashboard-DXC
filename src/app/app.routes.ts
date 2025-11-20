import { Routes } from '@angular/router';
import { Page404 } from './shared/page404/page404';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.routes)
  },
  {
    path: '404',
    component: Page404
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
