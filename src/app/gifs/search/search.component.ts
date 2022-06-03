import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @ViewChild('txtBuscar') TXTBUSCAR!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar() {
    const dato = this.TXTBUSCAR.nativeElement.value;

    if (dato.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(dato);

    this.TXTBUSCAR.nativeElement.value = '';
  }
}
