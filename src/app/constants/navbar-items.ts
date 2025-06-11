export interface NavbarItem {
  name: string;
  description: string;
  tooltip: string;
  icon: string;
  route: string;
}

const COMMON_ITEMS: NavbarItem[] = [
  {
    name: 'Pruebas',
    description: 'Dirige a la sección de pruebas',
    tooltip: 'Pruebas',
    icon: 'fa-solid fa-flask',
    route: '/pruebas',
  },
  
];

export const NAVBAR_ITEMS: { [role: string]: NavbarItem[] } = {
    especialista: [
      ...COMMON_ITEMS,
      
    ],
    usuario: [
      ...COMMON_ITEMS,
      
    ],
    artista: [
      ...COMMON_ITEMS,
      
    ],
  };