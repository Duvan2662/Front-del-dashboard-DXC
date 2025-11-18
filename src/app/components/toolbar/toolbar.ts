import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterModule} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  imports: [MatIcon,RouterModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {

}
