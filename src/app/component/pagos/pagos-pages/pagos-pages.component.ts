import { Component, OnInit, OnDestroy } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { PagosService } from '../../../service/ventas/pagos/pagos.service';
import { InputNumber } from 'primeng/inputnumber';
import { AutoComplete } from 'primeng/autocomplete';
import { MessagesService } from '../../../service/message/messages.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos-pages',
  imports: [
    CommonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ButtonModule,
    ButtonGroupModule,
    TableModule,
    FormsModule,
    DividerModule,
    AutoComplete,
    DialogModule,
  ],
  templateUrl: './pagos-pages.component.html',
  styleUrls: ['./pagos-pages.component.css'],
})
export class PagosPagesComponent implements OnInit, OnDestroy {
  consulta: number | undefined;
  id: number | undefined;
  pagoId: number[] = [];
  monto: number | undefined;
  items: any[] = [];
  products: any[] = [];
  ordenes: any[] = [];
  visiblePagar: boolean = false;
  dni: string = '';
  dniError: boolean = false;
  seleccionPrevia: boolean = false; // Nueva variable de estado

  constructor(
    private pagosService: PagosService,
    private messagesService: MessagesService,
  ) {}

  ngOnInit(): void {
    this.pagosService.getListaPagosPendientes().subscribe({
      next: (data: any) => {
        this.ordenes = data;
        this.items = data.map((pago: any) => ({ idOrden: pago.idOrden }));
      },
      error: (err) => {
        console.error('Error al cargar órdenes de pago', err);
      },
    });
  }

  buscar(event: any):void {
    const query = event.query.toLowerCase();
    this.items = this.ordenes
      .filter((orden) => orden.idOrden.toString().includes(query))
      .map((orden) => ({ idOrden: orden.idOrden }));
  }

  onSelectOrden(event: any): void {
    // Limpiar consultas anteriores al cambiar de orden
    this.limpiarConsultas();
    
    if (this.seleccionPrevia && this.id !== undefined) {
      this.pagosService.deleteSeleccionar().subscribe({
        next: (data: string) => {
          console.log(data);
        }
      });
    }
    this.id = event.idOrden;
    this.seleccionPrevia = true; // Actualiza la variable de estado

    if (this.id !== undefined) {
      this.pagosService.postSeleccionar(this.id).subscribe({
        next: (data: string) => {
          console.log(data);
          this.messagesService.successMessage(
            'Orden seleccionada',
            'La orden ha sido seleccionada con éxito',
          );
          this.pagosService.getListaCarrito().subscribe({
            next: (data: any) => {
              this.products = data;
              this.calculateMontoTotal(); // Calcular el monto total aquí
            },
            error: (err) => {
              console.error('Error al cargar carrito', err);
            },
          });
        },
        error: (err) => {
          console.error('Error al seleccionar orden', err);
        },
      });
    } else {
      console.error('ID is undefined');
    }
  }

  anadirConsulta(): void {
    if (this.consulta !== undefined) {
      this.pagosService.postAgregarConsulta(this.consulta).subscribe({
        next: (data: number) => {
          this.pagoId.push(data);
          this.messagesService.successMessage(
            'Consulta añadida',
            'La consulta ha sido añadida con éxito',
          );
          this.recargarCarrito();
          this.consulta=undefined;
        },
        error: (err) => {
          console.error('Error al añadir consulta', err);
        },
      });
    }
  }

  eleminarConsulta(): void {
    if (this.pagoId !== undefined && this.pagoId.length > 0) {
      let eliminacionesCompletadas = 0;
      this.pagoId.forEach((id) => {
        this.pagosService.deleteConsulta(id).subscribe({
          next: () => {
            eliminacionesCompletadas++;
            if (eliminacionesCompletadas === this.pagoId.length) {
              this.messagesService.successMessage(
                'Consulta eliminada',
                'La consulta ha sido eliminada con éxito',
              );
              this.recargarCarrito();
              this.consulta=undefined;

              
            }
            
          },
          error: (err) => {
            console.error('Error al eliminar consulta', err);
          },
        });
      });
      
    }  else {
      this.messagesService.errorMessage(
        'Error',
        'No se ha podido eliminar la consulta',
      );
    }
  }

  recargarCarrito(): void {
    this.pagosService.getListaCarrito().subscribe({
      next: (data: any) => {
        this.products = data;
        this.calculateMontoTotal();
      },
      error: (err) => {
        console.error('Error al recargar carrito', err);
      },
    });
  }

  calculateMontoTotal(): void {
    this.monto = this.products.reduce(
      (total, product) => total + product.subtotal,
      0,
    );
  }
  validateDni(): void {
    const dniPattern = /^[0-9]{8}$/;
    this.dniError = !dniPattern.test(this.dni);
  }

confirmarPago() {
  if (!this.dni || this.dniError) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Por favor, ingresa un DNI válido.',
    });
    return;
  }

  this.pagosService.validarDNI(this.dni).subscribe({
    next: (data: number) => {
      this.pagosService.postConfirmar(data).subscribe({
        next: (data: any) => {
          // Muestra un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Pago Confirmado!',
            text: 'El pago ha sido confirmado con éxito. La compra se ha realizado.',
          });

          // Actualiza las órdenes y productos
          this.pagosService.getListaPagosPendientes().subscribe({
            next: (data: any) => {
              this.ordenes = data;
              this.items = data.map((pago: any) => ({ idOrden: pago.idOrden }));
            },
            error: (err) => {
              console.error('Error al cargar órdenes de pago', err);
            },
          });

          // Restablecer el ID y recargar el carrito
          this.id = undefined;
          this.recargarCarrito();

          // Cierra el modal
          this.visiblePagar = false;
        },
        error: (err) => {
          this.messagesService.errorMessage(
            'Error',
            'No se ha podido confirmar el pago',
          );
        },
      });
    },
    error: (err) => {
      this.messagesService.errorMessage(
        'Error',
        'No se ha podido validar el DNI',
      );
    },
  });
}




expirarorden() {
  if (this.id !== undefined) {
    // Si id no es undefined, puedes llamar al servicio.
    this.pagosService.expirarOrdenPago(this.id).subscribe({
      next: (data: any) => {
        this.messagesService.successMessage(
          'Orden expirada',
          'La orden ha sido cancelada con éxito',
        );
        this.pagosService.deleteSeleccionar().subscribe({
          next: (data: string) => {
            console.log(data);
          },
        });
        this.pagosService.getListaPagosPendientes().subscribe({
          next: (data: any) => {
            this.ordenes = data;
            this.items = data.map((pago: any) => ({ idOrden: pago.idOrden }));
          },
          error: (err) => {
            console.error('Error al cargar órdenes de pago', err);
          },
        });
        this.recargarCarrito();
        this.id = undefined;
      },
      error: (err: any) => {
        this.messagesService.errorMessage(
          'Error',
          'No se ha podido expirar la orden',
        );
      },
    });
  } else {
    // Si id es undefined, muestra un mensaje de error o realiza una acción apropiada.
    this.messagesService.errorMessage(
      'Error',
      'No se ha seleccionado ninguna orden',
    );
  }
}


  
  // Nuevo método para limpiar consultas
  limpiarConsultas(): void {
    if (this.pagoId !== undefined && this.pagoId.length > 0) {
      let eliminacionesCompletadas = 0;
      this.pagoId.forEach((id) => {
        this.pagosService.deleteConsulta(id).subscribe({
          next: () => {
            eliminacionesCompletadas++;
            if (eliminacionesCompletadas === this.pagoId.length) {
              this.pagoId = []; // Limpiar array después de eliminar
            }
          },
          error: (err) => {
            console.error('Error al eliminar consulta', err);
          },
        });
      });
    }
  }
  
  // Implementar OnDestroy para limpiar al navegar a otra ruta
  ngOnDestroy(): void {
    // Limpiar consultas al salir del componente
    this.limpiarConsultas();
    
    // También limpiar la selección
    if (this.seleccionPrevia && this.id !== undefined) {
      this.pagosService.deleteSeleccionar().subscribe({
        next: (data: string) => {
          console.log('Selección eliminada al salir:', data);
        },
        error: (err) => {
          console.error('Error al eliminar selección', err);
        }
      });
    }
  }
}
