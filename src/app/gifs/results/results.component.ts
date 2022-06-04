import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent  {

get resultados(){
  return this.gifsService.result;
}

  constructor(private gifsService: GifsService) {}



}
