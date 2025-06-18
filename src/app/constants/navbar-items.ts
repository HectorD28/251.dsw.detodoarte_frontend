export interface NavbarItem {
  name: string;
  description: string;
  tooltip: string;
  icon: string;
  route: string;
}

const COMMON_ITEMS: NavbarItem[] = [
  
  
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