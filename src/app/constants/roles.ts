export const ROLES = Object.freeze({
  ESPECIALISTA: 'ESPECIALISTA',
  USUARIO: 'USUARIO',
  ARTISTA: 'ARTISTA',
  ADMINISTRADOR: 'ADMINISTRADOR',
});

//Incluye los tipos para verificarse con los ROLES
export type Role = 'ESPECIALISTA' | 'USUARIO' | 'ARTISTA' | 'ADMINISTRADOR';