import { PagosPagesComponent } from './component/pagos/pagos-pages/pagos-pages.component';
import { StockPageComponent } from './component/stock/stock-page/stock-page.component';
import { OrdenPageComponent } from './component/orden-page/orden-page/orden-page.component';
import { AgregarProductoComponent } from './component/agregar-producto/agregar-producto/agregar-producto.component';
import { AuthPageComponent } from './component/auth/auth-page.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CrearObraComponent } from './component/ARTISTAS/crear-obra/crear-obra.component';
import { AuthModule } from './component/auth/auth.module';
import { EstadoEvaluacionesComponent } from './component/ARTISTAS/estado-evaluaciones/estado-evaluaciones.component';
import { authGuard } from './auth/auth.guard';
import { RegistrarPersonaComponent } from './component/registrar-persona/registrar-persona.component';
import { PerfilComponent } from './component/perfil/perfil.component'; // Asegúrate de importar el componente correctamente
import { SolicitudExposicionPresencialComponent } from './component/ARTISTAS/solicitud-exposicion-presencial/solicitud-exposicion.component';
import { TrabajaConNosotrosComponent } from './component/trabaja-con-nosotros/trabaja-con-nosotros.component';
import { ProgramarExposicionComponent } from './component/programar-exposicion/programar-exposicion.component';
import { SolicitudExposicionVirtualComponent } from './component/ARTISTAS/solicitud-exposicion-virtual/solicitud-exposicion-virtual.component';
import { PruebasComponent } from './component/pruebas/pruebas.component';   
import { EstadoSolicitudPresencialComponent } from './component/ARTISTAS/estado-solicitud-presencial/estado-solicitud-presencial.component'; 
import { EstadoExposicionVirtualComponent } from './component/ARTISTAS/estado-exposicion-virtual/estado-exposicion-virtual.component';
import { UsuarioRegistradoComponent } from './component/usuarios/usuario-registrado/usuario-registrado.component';
import { SolicitudesEvaluacionObraComponent } from './component/solicitudes-evaluacion-obra/solicitudes-evaluacion-obra.component';
<<<<<<< HEAD
import { EvaluacionFormularioComponent } from './component/formulario-evaluacion-artistica/formulario-evaluacion-artistica.component';
=======
>>>>>>> 9229ae363f3f34c51d48d4699cd36ff7fe1d7006
export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home', 
        pathMatch: 'full'},

    {
        path: 'home', 
        component: HomeComponent},

    {
        path: 'registrar-persona',
        component:RegistrarPersonaComponent},

    {
        path: 'solicitudes-evaluacion-obra',
        component:SolicitudesEvaluacionObraComponent},

    {
        path: 'perfil', 
        component: PerfilComponent,
        canActivate: [authGuard],},

    {
        path: 'solicitud-exposicion-presencial', 
        component: SolicitudExposicionPresencialComponent},

    {
        path: 'solicitud-exposicion-virtual', 
        component: SolicitudExposicionVirtualComponent},
    
    {
        path: 'trabaja-con-nosotros', 
        component: TrabajaConNosotrosComponent},
    

    { 
        path: 'programar-exposicion', 
        component: ProgramarExposicionComponent },

    
    {
        path: 'auth', 
        component: AuthPageComponent },

<<<<<<< HEAD
    {
        path: 'pruebas',
        component: PruebasComponent
    },
=======
>>>>>>> 9229ae363f3f34c51d48d4699cd36ff7fe1d7006

    {
        path: 'stock-page',
        component: StockPageComponent,
    },

    {
        path: 'pagos-page',
        component: PagosPagesComponent,
    },

    {
        path: 'orden-page',
        component: OrdenPageComponent,
    },

    {
        path: 'agregar-producto',
        component: AgregarProductoComponent,
        
    },
    {
        path: 'crear-obra', 
        component: CrearObraComponent,
    },
    {
        path: 'estado-evaluaciones', 
        component: EstadoEvaluacionesComponent,
    },
    {
        path: 'estado-solicitud-presencial', 
        component: EstadoSolicitudPresencialComponent,
    },
    {
        path: 'estado-exposicion-virtual', 
        component: EstadoExposicionVirtualComponent,
    },
    {
        path: 'usuarios-registrados',
        component: UsuarioRegistradoComponent,
    },
    {
        path: 'solicitudes-evaluacion-obra',
        component: SolicitudesEvaluacionObraComponent,
    },
    {
        path: 'formulario-evaluacion-artistica',
        component: EvaluacionFormularioComponent,
    },

];

