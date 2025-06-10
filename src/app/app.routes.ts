import { PagosPagesComponent } from './component/pagos/pagos-pages/pagos-pages.component';
import { StockPageComponent } from './component/stock/stock-page/stock-page.component';
import { OrdenPageComponent } from './component/orden-page/orden-page/orden-page.component';
import { AgregarProductoComponent } from './component/agregar-producto/agregar-producto/agregar-producto.component';
import { AuthPageComponent } from './component/auth/auth-page.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AuthModule } from './component/auth/auth.module';
import { authGuard } from './auth/auth.guard';
import { RegistrarPersonaComponent } from './component/registrar-persona/registrar-persona.component';
import { PerfilComponent } from './component/perfil/perfil.component'; // Asegúrate de importar el componente correctamente
import { SolicitudExposicionComponent } from './component/solicitud-exposicion/solicitud-exposicion.component';
import { TrabajaConNosotrosComponent } from './component/trabaja-con-nosotros/trabaja-con-nosotros.component';
import { ObradearteComponent } from './component/obradearte/obradearte.component';
import { ProgramarExposicionComponent } from './component/programar-exposicion/programar-exposicion.component';

import { PruebasComponent } from './component/pruebas/pruebas.component';   



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
        path: 'perfil', 
        component: PerfilComponent,
        canActivate: [authGuard],},

    {
        path: 'solicitud-exposicion', 
        component: SolicitudExposicionComponent},

    {
        path: 'trabaja-con-nosotros', 
        component: TrabajaConNosotrosComponent},
    
    {
        path: 'obradearte', 
        component: ObradearteComponent},

    { 
        path: 'programar-exposicion', 
        component: ProgramarExposicionComponent },

    
    {
        path: 'auth', 
        component: AuthPageComponent },

    {
        path: 'pruebas',
        component: PruebasComponent
    },

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

    
];

