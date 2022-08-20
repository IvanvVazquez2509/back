/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { response } from "../utils/functions/response";
import HTTP_STATUS_CODES from "../utils/constants/httpStatusCodes";
import { AppStrings } from "../utils/constants/strings";
import environment from "../environment/environment";
import { Usuario } from "../models/usuario/usuario.model";

export const validateJWT = async (
  req: Partial<Request | any>,
  res: Response,
  next: NextFunction
) => {
  const { NO_TOKEN, INVALID_TOKEN, NO_USER, INACTIVE_USER, NO_AUTH } =
    AppStrings;
  const { UNAUTHORIZED } = HTTP_STATUS_CODES;
  const authorization = req.header("Authorization");
  if (!authorization) {
    const msg = NO_AUTH;
    return response(res, UNAUTHORIZED, msg, {}, null);
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    const msg = NO_TOKEN;
    return response(res, UNAUTHORIZED, msg, {}, null);
  }
  try {
    const decodedToken: any = jwt.verify(token, environment.JWT_SECRET || "");
    const usuario = await Usuario.findByPk(decodedToken.uuid);
    if (!usuario) {
      const msg = NO_USER;
      return response(res, UNAUTHORIZED, msg, {}, null);
    }
    if (usuario.deletedAt && String(usuario.deletedAt) !== "Invalid Date") {
      const msg = INACTIVE_USER;
      return response(res, UNAUTHORIZED, msg, {}, null);
    }
    const usuarioJson = usuario.toJSON();
    req.usuario = usuarioJson;
    return next();
  } catch (error) {
    const msg = INVALID_TOKEN;
    return response(res, UNAUTHORIZED, msg, {}, null);
  }
};
