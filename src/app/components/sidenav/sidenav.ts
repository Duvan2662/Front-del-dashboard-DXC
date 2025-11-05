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
    { path: './dashboard/mobile', icon: 'on_device_training', label: 'Dispositivos' },
    { path: '/analytics', icon: 'bar_chart', label: 'Analytics' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
  ]);

  collapsed = input.required<boolean>();

}
