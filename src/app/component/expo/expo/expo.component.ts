import { Component, OnInit } from '@angular/core';
import { ObraDeArteService } from '../../../service/obradearte.service'; // Ajusta la ruta de importación según corresponda
import { IObraDeArteResponse } from '../../../model/obradearte-response';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OrdenService } from '../../../service/ventas/orden/orden.service'; // Asegúrate de importar el servicio de orden
import { CartService } from '../../../service/cart/cart.service'; // Asegúrate de importar el servicio de carrito
@Component({
  selector: 'app-expo',
  templateUrl: './expo.component.html',
  styleUrls: ['./expo.component.css'],
  imports :[CommonModule], // Asegúrate de importar CommonModule y BrowserModule
  standalone: true,  
})
export class ExpoComponent implements OnInit {
  obras: IObraDeArteResponse[] = []; // Variable para almacenar las obras de arte
  loading: boolean = false;  // Variable para mostrar el estado de carga

  constructor(
    private obraDeArteService: ObraDeArteService,
    private ordenService: OrdenService,
    private cartService: CartService // Asegúrate de importar el servicio de carrito
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.obtenerObrasDeArte(); // Llamar al método para obtener las obras de arte
  }

  obtenerObrasDeArte(): void {
    this.obraDeArteService.obtenerTodasObras().subscribe(
      (data: IObraDeArteResponse[]) => {
        this.obras = data;  // Almacenar las obras de arte obtenidas
        this.loading = false; // Detener la carga

        // Mostrar una alerta si no se encuentran obras
        if (this.obras.length === 0) {
          this.mostrarAlertaSinObras();
        }
      },
      (error) => {
        console.error('Error al obtener las obras de arte', error);
        this.loading = false;  // Detener la carga en caso de error
        // Mostrar alerta en caso de error de conexión
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al cargar las obras de arte. Intenta de nuevo más tarde.',
        });
      }
    );
  }

  // Función para mostrar una alerta cuando no hay obras de arte
  mostrarAlertaSinObras(): void {
    Swal.fire({
      icon: 'info',
      title: 'No hay obras disponibles',
      text: 'Actualmente no hay obras de arte disponibles en la galería.',
    });
  }


  agregarAlCarrito(idProducto: number, cantidad: number): void {
    this.cartService.actualizarCantidadProductos(this.cartService.obtenerCantidadProductos()+1); // Actualizar la cantidad de productos en el carrito
    this.ordenService.seleccionarProducto(idProducto, cantidad).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado al carrito',
          text: `La obra de arte ha sido agregada al carrito correctamente.`,
        });
      },
      (error) => {
        console.error('Error al agregar producto al carrito', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al agregar el producto al carrito. Intenta de nuevo.',
        });
      }
    );



  }

}
