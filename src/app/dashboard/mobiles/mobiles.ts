import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { CardInterface } from '../../interfaces/card.interface';

@Component({
  selector: 'app-mobiles',
  imports: [CommonModule,Card],
  templateUrl: './mobiles.html',
  styleUrl: './mobiles.css',
})
export class Mobiles {
  cards: CardInterface[] =[
    { title: 'Agregar dispositivo', icon: 'add', url: '/dashboard/mobiles'},
    { title: 'Editar dispositivos', icon: 'edit', url: '/dashboard/edit-device'},
    { title: 'Dispositivos en uso', icon: 'bar_chart', url: '/dashboard/devices-in-use'},
  ]
}
