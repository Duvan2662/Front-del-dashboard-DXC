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
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/videos', icon: 'video_library', label: 'Videos' },
    { path: '/analytics', icon: 'bar_chart', label: 'Analytics' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
  ]);

  collapsed = input.required<boolean>();

}
