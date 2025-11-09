import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardInterface } from '../../interfaces/card.interface';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CommonModule,MatIconModule,RouterModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() card!:CardInterface;
}
