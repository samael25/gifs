import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsServiceService } from '../services/gifs-service.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  private apikey: string = 'P3XaLZWIoPBz7sD8FGRMGUC76R6w7K7Q';

  @ViewChild( 'txtBuscar' ) txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsServiceService) { }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    if( valor.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }


  ngOnInit(): void {
  }

}
