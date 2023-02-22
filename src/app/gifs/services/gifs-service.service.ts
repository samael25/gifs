import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsServiceService {
  private apiKey: string ='P3XaLZWIoPBz7sD8FGRMGUC76R6w7K7Q';
  private _historial: string[] = [];

  public resultados: gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }
  
  buscarGifs( query: string ) {

  query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query )){
    this._historial.unshift( query );
     this._historial = this._historial.splice(0,10);
     localStorage.setItem('historial', JSON.stringify( this._historial));

    }
  
  this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=P3XaLZWIoPBz7sD8FGRMGUC76R6w7K7Q&q=${query}&limit=10`)
    .subscribe( ( resp ) => {
      this.resultados = resp.data
      localStorage.setItem('resultados', JSON.stringify( this.resultados));

    })
  }


}
