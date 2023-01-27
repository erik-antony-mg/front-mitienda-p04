import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { ActivatedRoute } from '@angular/router';
import { Venta, Item } from '../shared/venta.model';

@Component({
  selector: 'app-detalles-venta',
  templateUrl: './detalles-venta.component.html',
  styleUrls: ['./detalles-venta.component.css']
})
export class DetallesVentaComponent implements OnInit {

  venta?: Venta;
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idVenta = parseInt(this.route.snapshot.paramMap.get('idVenta')!);
    this.homeService.getVenta(idVenta)
      .subscribe(venta => {
        this.venta = venta;
      })
  }

  descargarArchivo(item: Item) {
    this.homeService.descargarArchivoItemVenta(this.venta!.id, item.id)
      .subscribe(resp => {
        const _blop = new Blob([resp], {
          type: 'application/pdf;charset=utf-8'
        });
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(_blop);

        a.href = url;
        a.download = `${item.libro.slug}.pdf`;
        a.click();
        URL.revokeObjectURL(url);

        item.numeroDescargasDisponibles -= 1;
      })
  }
}
