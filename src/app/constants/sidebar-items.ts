export interface SidebarItem {
  name: string;
  description: string;
  tooltip: string;
  icon: string;
  route: string;
}

//Opciones en común para los roles
const COMMON_ITEMS: SidebarItem[] = [
  {
    name: 'Perfil',
    description: 'Dirige al perfil del usuario',
    tooltip: 'Perfil',
    icon: 'fa-solid fa-circle-user',
    route: '/perfil',
  },
  {
    name: 'Inicio',
    description: 'Dirige a la página de inicio',
    tooltip: 'Inicio',
    icon: 'fas fa-home',
    route: '/home',
  },

  {
    name: 'Compras',
    description: 'Dirige a la sección de compras',
    tooltip: 'Compras',
    icon: 'fa-solid fa-wallet',
    route: '/pruebas',
  },

  {
        name: 'Registrar Pagos',
        description: 'Sección para gestionar los pagos',
        tooltip: 'Pagos',
        icon: 'fa fa-credit-card-alt',
        route: '/pagos-page',
      },
  
];

//Opciones especificas por el rol (veterinario, recepcionista, farmaceutico)
export const SIDEBAR_ITEMS: { [role: string]: SidebarItem[] } = {
    especialista: [
      ...COMMON_ITEMS,
      
      {
        name: 'Pruebas',
        description: 'Dirige a la sección de pruebas',
        tooltip: 'Pruebas',
        icon: 'fa-solid fa-flask',
        route: '/pruebas',
      },
<<<<<<< HEAD
      {
        name: 'Evaluaciones',
        description: 'Dirige a la sección de evaluaciones de obra',
        tooltip: 'Evaluaciones',
        icon: 'fa-solid fa-flask',
        route: '/solicitudes-evaluacion-obra',
      },
=======

      {
        name: 'Solicitud de Evaluacion',
        description: 'Dirige a la sección de pruebas',
        tooltip: 'Pruebas',
        icon: 'fa-solid fa-flask',
        route: '/solicitudes-evaluacion-obra',
      },


>>>>>>> 9229ae363f3f34c51d48d4699cd36ff7fe1d7006
       
    ],
    usuario: [
      ...COMMON_ITEMS,
        



    ],


    artista: [
      ...COMMON_ITEMS,
      {
        name: 'Solcitar Exposición',
        description: 'Sección para solicitar una exposición de arte',
        tooltip: 'Exposición',
        icon: 'fa fa-medkit',
        route: '/solicitud-exposicion',
      },
      {
        name: 'Subir Nueva Obra',
        description: 'Sección para subir obra de arte',
        tooltip: 'Nueva Obra de Arte',
        icon: 'fa fa-medkit',
        route: '/crear-obra',
      },
       
    ],

    
    administrador: [
    ...COMMON_ITEMS,
    // Puedes agregar más ítems exclusivos para administrador aquí
    // Ejemplo:
     {
      name: 'Programar Exposición',
      description: 'Sección para programar una exposición',
      tooltip: 'Programar',
      icon: 'fa fa-calendar-plus',
      route: '/programar-exposicion',
    }
    ],
  };