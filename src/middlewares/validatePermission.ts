import { NextFunction, Request, Response } from "express";
import HTTP_STATUS_CODES from "../utils/constants/httpStatusCodes";
import { response } from "../utils/functions/response";
import { IUsuario } from "../models/usuario/usuario.model";
import { getRolLabel } from "../utils/constants/roles";

const { UNAUTHORIZED, FORBIDDEN } = HTTP_STATUS_CODES;

const validatePermission = (validRoles: number[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (req: Partial<Request | any>, res: Response, next: NextFunction) => {
    const user: IUsuario = req.usuario;
    if (!req.usuario) {
      const msg =
        "Se quiere verificar el rol del usuario sin validar el token primero.";
      return response(res, UNAUTHORIZED, msg, null, null);
    }
    
    next();
  };
};

const hasValidRole = (userRole: number, roles: number[]) => {
  let flag = false;
  roles.forEach((role) => {
    if (role === userRole) {
      flag = true;
    }
  });
  return flag;
};

const createValidRolesMessage = (validRoles: number[]) => {
  let validRolesMessage = "Roles válidos: ";
  validRoles.forEach((rol) => {
    validRolesMessage += getRolLabel(rol) + " | ";
  });
  return validRolesMessage.substring(0, validRolesMessage.length - 3);
};

export default validatePermission;
