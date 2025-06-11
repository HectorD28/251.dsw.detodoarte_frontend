import { Producto } from './../../model/ventas/producto.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faMinusSquare, faPlusSquare, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { OrdenService } from '../../service/ventas/orden/orden.service'; // Asegúrate de importar el servicio de orden
import { ProductoOrden } from '../../model/ventas/producto-orden.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { OrdenPago } from '../../model/ventas/orden-pago.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
    imports: [CommonModule, TableModule, ButtonModule, ConfirmDialogModule, MessageModule, ToastModule],
  providers: [ConfirmationService, MessageService]
})

export class CartComponent implements OnInit {

  iconBag = faShoppingBag
  iconTrash = faTrashAlt
  iconPlus = faPlusSquare
  iconMinus = faMinusSquare
  imgHeight = "80"
  imgWidth =" 80"
  imgEmptyCart = './img/empty_cart.jpg'
  imgEmptyCartW = "300"

  public cartTotal !: number;
  numeroOrden: string = '';
  fechaOrden: string = '';
  productosSeleccionados: ProductoOrden[] = [];
  subtotalGeneral: number = 0;
  igv: number = 0;
  total: number = 0;

  cartProductCount: number = 0;


  constructor(
    private cartService: CartService,
   private router: Router,
    private ordenService: OrdenService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    
    
    @Inject(MAT_DIALOG_DATA) public content: string
    ) {

    }

  ngOnInit(): void {
    this.numeroOrden = this.generarNumeroOrden();
    this.fechaOrden = new Date().toLocaleString();

    this.cargarCarrito();
 
    this.cartProductCount = this.cartService.obtenerCantidadProductos();

    
  }

cargarCarrito(): void {
    this.ordenService.listarProductosSeleccionados().subscribe({
      next: (productos: ProductoOrden[]) => {
        this.productosSeleccionados = productos;
        this.calcularTotales();


        const cantidadProductos = productos.length;  // Contamos los productos
        this.cartService.actualizarCantidadProductos(cantidadProductos);
        console.log("📦 Productos cargados en el carrito:", this.productosSeleccionados);
      
      },
      error: (err) => {
        console.error("❌ Error al obtener productos seleccionados:", err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos de la orden.'
        });
      }
    });
  }


calcularTotales() {
    this.subtotalGeneral = this.productosSeleccionados.reduce((acc, p) => acc + (p.subtotal || 0), 0);
    this.igv = this.subtotalGeneral * 0.18;
    this.total = this.subtotalGeneral + this.igv;
  }

 generarNumeroOrden(): string {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }

  confirmarOrden(): void {
    if (this.productosSeleccionados.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Orden Vacía',
        text: 'No se puede generar una orden sin productos.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    Swal.fire({
      title: '¿Está seguro de generar la orden de pago?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.generarOrden();
      }
    });
  }


  generarOrden(): void {
      const orden: OrdenPago = {
        estado: "PENDIENTE",
        productos: this.productosSeleccionados,
        total: this.total
      };

      console.log('📢 Enviando orden a la API:', JSON.stringify(orden, null, 2));

      this.ordenService.confirmarOrden(orden).subscribe({
        next: (response) => {
          console.log('✅ Respuesta de la API:', response);
          Swal.fire({
            icon: 'success',
            title: 'Orden Generada',
            text: 'La orden se generó exitosamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#38a169',
          });

          setTimeout(() => {
            this.router.navigate(['/stock']);
          }, 1500);
        },
        error: (error) => {
          console.error('❌ Error al generar la orden:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo generar la orden, intenta nuevamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#e53e3e',
          });
        }
      });
    }


  cancelarOrden(): void {
      Swal.fire({
        title: '¿Está seguro de cancelar la orden?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Cancelar',
        cancelButtonText: 'No, Continuar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("🛑 Cancelando orden en el backend...");

          this.ordenService.cancelarOrden().subscribe({
            next: (res) => {
              console.log("✅ Orden cancelada:", res);

              // Limpiar los productos seleccionados y los totales
              this.productosSeleccionados = []; // Limpiamos los productos
              this.cartService.actualizarCantidadProductos(0); // Actualizamos el contador de productos en el carrito
              this.calcularTotales(); // Recalculamos los totales

              Swal.fire({
                icon: 'success',
                title: 'Orden Cancelada',
                text: 'La orden ha sido cancelada correctamente.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#38a169',
              });

              // Limpiar datos de la orden en localStorage
              localStorage.removeItem('ordenPago');

              // Redirigir al usuario a la página de stock después de un pequeño delay
              setTimeout(() => {
                this.router.navigate(['/stock']);
              }, 1500);
            },
            error: (err) => {
              console.error("❌ Error al cancelar la orden:", err);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cancelar la orden, intenta nuevamente.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#e53e3e',
              });
            }
          });
        }
      });
    }




    eliminarProductoDeLista(id_obra: number, producto:ProductoOrden): void {
      
      console.log(`🗑️ Intentando eliminar el producto ${producto.productoNombre}...`);
      Swal.fire({
        title: `¿Estás seguro de eliminar el producto ${id_obra}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Eliminar',
        cancelButtonText: 'No, Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(`🗑️ Eliminando producto ${id_obra}...`);

          this.productosSeleccionados = this.productosSeleccionados.filter(p => p.obraId !== id_obra);


          this.ordenService.cancelarProducto(id_obra).subscribe({
            next: (res) => {
              console.log("✅ Orden cancelada:", res);

              this.cartService.actualizarCantidadProductos(this.cartService.obtenerCantidadProductos()-1); // Actualizamos el contador de productos en el carrito
              this.calcularTotales(); // Recalculamos los totales

              

              // Limpiar datos de la orden en localStorage
              localStorage.removeItem(producto.obraId.toString());


            },
            error: (err) => {
              
            }
          });;


          // Mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Producto Eliminado',
            text: `El producto ${producto.tipo} ha sido eliminado de la lista.`,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#38a169',
          });
        }
      });
    }





}
