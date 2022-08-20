export const ROLES = {
  ADMIN: 1,
  USUARIO: 2,
};

export const ROLES_LABELS = ["ADMIN", "USUARIO"];

export const getRolLabel = (idRol: number) => {
  return ROLES_LABELS[idRol - 1];
};

const { ADMIN, USUARIO } = ROLES;

export const PERMISSIONS = {
  ADMIN: [ADMIN],
  USUARIO: {
    READ: [ADMIN, USUARIO],
  },
  CUENTA: {
    CREATE: [ADMIN, USUARIO],
    READ: [ADMIN, USUARIO],
    UPDATE: [ADMIN, USUARIO],
    DELETE: [ADMIN],
  },
};
