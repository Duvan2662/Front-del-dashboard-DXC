import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../interfaces/menuItem.interface';

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  items = signal<MenuItem[]>([
    { path: './dashboard/home', icon: 'home', label: 'Home' },
    { path: './dashboard/mobiles', icon: 'on_device_training', label: 'Dispositivos' },
    { path: './dashboard/users', icon: 'account_circle', label: 'Usuarios' },
  ]);

  collapsed = input.required<boolean>();

}
