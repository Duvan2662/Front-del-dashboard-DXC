import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from './components/header/header';
import { Sidenav } from './components/sidenav/sidenav';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatSidenavModule, Header, Sidenav,MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FrontApp');
  collapsed = signal(false);
  width = computed(() => (this.collapsed() ? 64 : 250));
}
