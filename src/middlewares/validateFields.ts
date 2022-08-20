import { Result, validationResult, ValidationError } from "express-validator";
import { Request, Response, NextFunction } from "express";
import {} from "sequelize/types";
import { response } from "../utils/functions/response";
import HTTP_STATUS_CODES from "../utils/constants/httpStatusCodes";

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = createValidationErrorMessage(errors);
    return response(res, HTTP_STATUS_CODES.BAD_REQUEST, msg, {}, null);
  }
  next();
};

const createValidationErrorMessage = (result: Result<ValidationError>) => {
  let errorMsg = "";
  result.array().forEach((e) => {
    errorMsg += e.msg + " | ";
  });
  return errorMsg.substring(0, errorMsg.length - 3);
};
