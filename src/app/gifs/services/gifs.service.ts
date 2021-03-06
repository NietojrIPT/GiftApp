import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = '4h6gTefyKqyHd2qgTTBgpoDZGf9Qb8vT';
  private ServicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  // TODO: Cambiar any por su type correspondiente
  public result: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    this.result = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();  // pone todo el texto ingresado en minuscula

    if (!this._historial.includes(query)) {  // compara si existe un registro con el mismo nombre que se almacena en e query
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));  //nos indica lo que va almacenar en memeoria del navegador
    }

    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.ServicioURL}/search`, { params })
      .subscribe((resp) => {
        this.result = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.result));
      });
  }
}
